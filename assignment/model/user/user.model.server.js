var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model("User",userSchema);


userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUserName = findUserByUserName;
userModel.findByCredential = findByCredential;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByFacebookId = findUserByFacebookId;

module.exports = userModel;


function createUser(user) {
  console.log("model"+user);
  return userModel.create(user);
}

function findUserById(id) {
  return userModel.findById(id);
}

function findUserByUserName(userName) {
  return userModel.findOne({userName:userName});
}

function findByCredential(userName,password){
  return userModel.findOne({userName:userName,password:password});
}

function updateUser(userId,user) {
  return userModel.findByIdAndUpdate(userId,user);
}

function deleteUser(userId){
  return userModel.findByIdAndRemove(userId);
}

function findUserByFacebookId(facebookId) {
  console.log("find by facebook id");
  return userModel.findOne({'facebook.id' : facebookId});
}

function findByTry() {

}




