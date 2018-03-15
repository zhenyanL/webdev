var express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const http = require('http');
// var multer = require('multer');
// var upload = multer({dest: "./uploads"});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'dist')));

//CORS
app.use(function(reg, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  next();
})

const port=process.env.PORT || '3100';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

app.get('/try',function (req,res,next) {
  console.log("????");
  res.send("ok");
});

require("./assignment/app")(app);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist','index.html'));
});

// app.use(app.router);
// app.use(function(req, res) {
//   // Use res.sendfile, as it streams instead of reading the file into memory.
//   res.sendfile(__dirname + '/src/index.html');
// });

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname,'dist/index.html'));
// });

// app.post('/api/user',createUser);
//
// function createUser(req,res) {
//
//   // res.send("ok");
//   var user = req.body;
//   console.log(req.body);
//   console.log("?????/");
//   // res.json(user);
//   res.status(200).send(user);
// }

server.listen( port , function() {
  console.log('Node app is running on port', app.get('port'))});
