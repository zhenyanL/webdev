

module.exports = function (app) {

  var users = [
    {id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonderland"  },
    {id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];

  app.get('/api/user?username=username',findUserByUsername);
  app.post('/api/user',createUser);
  app.get('/api/user?username=username&password=password',findUserByCredential);
  app.get('/api/user/:userId',findUserById);
  app.post('/api/user/:userId',updateUser);
  app.delete('/api/user/:userId',deleteUser);





  function createUser(req,res,next) {
    var user = req.body;
    users.push(user);
    res.status(200).send(user);

  }

  function updateUser(req,res,next) {
    var id = req.param["userId"];
    var user = req.body;
    for(var i = 0; i < users.length; i++){
        if(users[i].id === id){
          // ?? will id and username change??
          user[i] = user;
          res.status(200).send(user);
        }
    }
    res.status(404).send("not found");


  }


  function findUserById(req,res,next){
    var id = req.param["userId"];
    var user = users.find(function(user){
      return user.id === id;
    });
    res.json(user);
  }

  function findUserByCredential(req,res,next){
    var username = req.param["username"];
    var password = req.param["password"];
    var user = users.find(function(user){
      return user.username === username && user.password === password;
    });
    res.json(user);
  }

  function findUserByUsername(req,res,next){
    // return this.users.find(user =>  user.userName === userName);
    var name = req.username;
    var user =  users.find(function(user){
      return user.username === name;
    });
    res.json(user);
  }


  function deleteUser(req,res,next){
    var id = req.param["userId"];
    // const index = this.users.findIndex(user => user.id === userId);
    var index = users.findIndex(function (user) {
      return users.id === id;
    });
    if(index === -1){
      res.status(400).send("not found");
    }
    this.users.splice(index, 1);
    res.status(200).send("ok");
  }
}
