var mongoose = require('mongoose');
var websiteSchema = require("./website.schema.server");
var userModel = require("../user/user.model.server");

var websiteModel = mongoose.model("Website",websiteSchema);

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.findAllWebsiteForUser = findAllWebsiteForUser;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;


module.exports = websiteModel;



function createWebsiteForUser(userId,website) {
  console.log("model"+website);

    return websiteModel.create(website)
    .then(
      function (createdWebsite) {
        userModel.findUserById(userId)
          .then(
            function (user) {
              user.websites.push(createdWebsite);
              userModel.updateUser(userId,user);
            }
          );
        return createdWebsite;
      }
    )
  //
  // userModel.findUserById(userId)
  //     .then(
  //     function (user) {
  //       websiteModel.create(website)
  //         .then(
  //           function (createdWebsite) {
  //             user.websites.push(createdWebsite);
  //             // console.log(user);
  //             // userModel.updateUser(user._id,user)
  //             //   .then(
  //             //     function (newUser) {
  //             //       return createdWebsite;
  //             //     },
  //             //     function (err) {
  //             //       res.statusCode(400).send(err);
  //             //     }
  //             //   )
  //             userModel.updateUser(userId,user)
  //               .then(
  //                 function(newUser){
  //                   return createdWebsite;
  //                 },
  //                 function (err) {
  //
  //                 }
  //               )
  //           },
  //           function (err) {
  //             // res.statusCode(400).send(err);
  //           }
  //         )
  //     },
  //     function (err) {
  //       // res.statusCode(400).send(err);
  //     }
  //   )
  //this is an asynchronous call!!! before it come back you already proceed the next line
  // console.log(user);
  // console.log(user.userName);
  // console.log(user.websites);
  //
  // var createdWebsite = websiteModel.create(website);
  // user.websites.push(createdWebsite);
  // userModel.updateUser(userId,user);
  // return createdWebsite;
}

function findAllWebsiteForUser(userId) {
  return websiteModel.find({userId:userId});
}

function findWebsiteById(id) {
  return websiteModel.findById(id);
}

function updateWebsite(id,website) {
  return websiteModel.findByIdAndUpdate(id,website);
}

function deleteWebsite(id){
  return websiteModel.findByIdAndRemove(id);
}

