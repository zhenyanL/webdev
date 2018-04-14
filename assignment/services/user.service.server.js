// / var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (app) {


  // var users = [
  //   {id: "123", userName: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonderland", email: "123@gmail.com"  },
  //   {id: "234", userName: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "123@gmail.com"  },
  //   {id: "345", userName: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "123@gmail.com"  },
  //   {id: "456", userName: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "123@gmail.com" }
  // ];

  var userModel = require('../model/user/user.model.server');

  // passport.use(new LocalStrategy(localStrategy));
  // passport.use(new LocalStrategy(localStrategy));
  // passport.serializeUser(serializeUser);
  // passport.deserializeUser(deserializeUser);
  var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    // clientID     : "1999606587021313",
    // clientSecret : "9c5d3de860acef46c2ab49f0d0dc5e18",
    // callbackURL  : "http://localhost:4200"
  };



  // app.get('/api/user/find',findUserByUsername);
  app.post('/api/user',createUser);
  app.get('/api/user',findUserByCredential);
  app.get('/api/user/:userId',findUserById);
  app.put("/api/user/:userId", updateUserById);
  app.delete('/api/user/:userId',deleteUser);
  app.post('/api/login',passport.authenticate('local'),login);
  app.post('/api/logout',logout);
  app.post('/api/register',register);
  app.post('/api/loggedin',loggedin);
  app.get('/facebook/login',passport.authenticate('facebook',{scope: 'email'}));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }));


  passport.use(new LocalStrategy(localStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

  function facebookStrategy(token, regreshToken, profile, done) {
    userModel.findUserByFacebookId(profile.id)
      .then(
        function (user) {
          if(user){
            return done(null,user);
          }else{
            var names = profile.displayName.split(" ");
            var newFacebookUser = {
             userName: 'username',
              password: '123',
              lastName: names[1],
              firstName: names[0],
              email: profile.emails ? profile.emails[0].value:"",
              facebook: {
                id: profile.id,
                token: token
              }
            };
            console.log("get token back");
            return userModel.createUser(newFacebookUser);
          }
        },
        function (err) {
          if(err){
            return done(err);
          }
        }
      )
      .then(
        function (user) {
          return done(null,user);
        },
        function (err) {
          if(err){
            return done(err);
          }
        }
      );
  }

  function localStrategy(userName, password, done){
    console.log("strategy");
    userModel.findUserByUserName(userName)
      .then(
        function(user){
          if(user){
            if(user.userName === userName && user.password === password){
              return done(null,user);
            }
            else{
              return done(null,false);
            }
          }
          else{
            return done(null,false);
          }

        },
        function (err) {
          if(err){
            return done(err);
          }
        }

      );
  }

  function serializeUser(user, done) {
    done(null, user);
  }
  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  app.get('/api/login',function (req,res,next) {
    console.log("????");
    res.send("ok");
  });


  function login(req, res) {
    var user = req.user;
    console.log("back: " + user);
    res.json(user);
  }

  function logout(req,res) {
    req.logOut();
    res.send(200);
  }

  function register(req,res) {
    var user = req.body;
    userModel.createUser(user)
      .then(
        function (user) {
          if(user){
            req.login(user,function (err) {
              if(err){
                res.status(400).send(err);
              }
              else{
                res.json(user);
              }
            })
          }
        }
      )
  }

  function loggedin(req,res) {
    res.send(req.isAuthenticated()?req.user : '0');
  }


  function createUser(req,res,next) {

    var user = req.body;
    // users.push(user);
    // console.log(users.toString());
    // console.log(req.body);
    console.log("server side")
    userModel.createUser(user).then(
      // function (err,createdUser) {
      //   console.log("back"+createdUser);
      //   if(err){
      //     return res.statusCode(400).send(error);
      //   }
      //
      //     console.log("Server"+ createdUser);
      //     return res.status(200).send(createdUser);
      //
      // }
      function (user) {
        console.log("back "+user);
        res.json(user);
      },
      function (error) {
        res.statusCode(400).send(error);
      }
    );

  }

  function updateUserById(req, res){
    var userId = req.params['userId'];
    var user = req.body;

    console.log(req.body);
    console.log("update user: " + userId + " " + user.firstName + " " + user.lastName);

    userModel.updateUser(userId,user).
      then(
        function (user) {
          res.json(user);
        },
      function (err) {
        res.statusCode(400).send(err);
      }
    )
    // exec(
    //   function (err,user) {
    //     if(err){
    //       return res.sendStatus(400).send(err);
    //     }
    //     return  res.json(user);
    //   }
    // );

    // for(var i = 0; i < users.length; i++) {
    //   if (users[i].id === userId) {
    //     users[i].firstName = user.firstName;
    //     users[i].lastName = user.lastName;
    //
    //     res.status(200).send(users[i]);
    //     return;
    //   }
    // }
    // res.status(404).send("not found!");
  }



  function findUserById(req,res,next){
    // console.log("????");
    var id = req.params.userId;
    userModel.findUserById(id).
    exec(
      function (err,user) {
        if(err){
          return res.sendStatus(400).send(err);
        }
        return  res.json(user);
      }
    );

    //
    // // console.log(id);
    // var user = users.find(function(user){
    //   return user.id === id;
    // });
    // // console.log(user);
    // res.json(user);
  }

  function findUserByCredential(req,res,next){


    var username = req.query["username"];
    var password = req.query["password"];
    console.log(username);
    console.log(password);
    userModel.findByCredential(username,password).
    exec(
      function (err,user) {
        if(err){
          return res.sendStatus(400).send(err);
        }
        return res.json(user);
      }
    );

    //
    // var foundUser = null;
    // if(username && password){
    //   users.forEach(function (user) {
    //     console.log(user);
    //   });
    //   users.forEach(function (user) {
    //     console.log(user.userName);
    //     console.log(user.password);
    //     if(user.userName === username && user.password === password){
    //       foundUser = user;
    //     }
    //   });
    //   // user = users.find(function(user){
    //   //   return (user.userName === username && user.password === password);
    //   // });
    // }
    // // res.send("ok");
    // console.log(foundUser);
    // res.json(foundUser);
  }


  function findUserByUsername(req,res,next){
    // return this.users.find(user =>  user.userName === userName);
    var name = req.query.username;
    var user =  users.find(function(user){
      return user.userName === name;
    });
    res.json(user);
  }


  function deleteUser(req,res,next){
    // var id = req.params["userId"];
    var id = req.params.userId;
    // const index = this.users.findIndex(user => user.id === userId);
    // var index = users.findIndex(function (user) {
    //   return user.id === id;
    // });
    // if(index === -1){
    //   res.status(400).send("not found");
    // }
    // users.splice(index, 1);
    // res.status(200).send("ok");
    console.log("back server start" + id);
    userModel.deleteUser(id)
      .then(
        function (user) {
          console.log("back server back");
          res.json(user);
        },
        function (err) {
          res.status(400).send(err);
        }
      )
  }

}
