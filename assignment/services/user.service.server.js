

module.exports = function (app) {


  // var users = [
  //   {id: "123", userName: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonderland", email: "123@gmail.com"  },
  //   {id: "234", userName: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "123@gmail.com"  },
  //   {id: "345", userName: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "123@gmail.com"  },
  //   {id: "456", userName: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "123@gmail.com" }
  // ];

  var userModel = require('../model/user/user.model.server');

  // app.get('/api/user/find',findUserByUsername);
  app.post('/api/user',createUser);
  app.get('/api/user',findUserByCredential);
  app.get('/api/user/:userId',findUserById);
  app.put("/api/user/:userId", updateUserById);
  app.delete('/api/user/:userId',deleteUser);

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
