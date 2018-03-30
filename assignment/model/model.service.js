var mongoose = require('mongoose');
// var db = mongoose.connect('mongodb://localhost:27017/webdev');
var db = mongoose.connect('mongodb://lin:123@ds223609.mlab.com:23609/heroku_1pmwr7n2');
// "mongodb://<lin>:<123>@ds223609.mlab.com:23609/heroku_1pmwr7n2";
console.log("check");
module.exports = db;
