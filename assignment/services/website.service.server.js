module.exports = function(app){
    // var Website = require('../../src/app/model/website.model');
  // var websites = [
  //   {id:'456', name:'Gizmode', developerId:'456', description:'Lorem'},
  // {id:'123', name: 'Facebook', developerId:'456', description:'Lorem'},
  //   {id:'234', name:'Tweeter', developerId:'456', description:'Lorem'},
  //   {id:'890', name:'Go', developerId:'123', description:'Lorem'},
  //   {id:'567', name:'Tic Tac Toe', developerId:'123', description:'Lorem'},
  //   {id:'678', name:'Checkers', developerId:'123', description:'Lorem'},
  // {id:'789', name:'Chess', developerId:'234', description:'Lorem'},
  // ];

var websiteModel = require("../model/website/website.model.server");

  app.post('/api/user/:userId/website',createWebsite);
  app.get('/api/user/:userId/website',findWebsiteForUser);
  app.get('/api/website/:websiteId',findWebsiteById);
  app.put('/api/website/:websiteId',updateWebsite);
  app.delete('/api/website/:websiteId',deleteWebsite);


  function createWebsite(req,res,next){

      var website = req.body;
      // website.id = (new Date()).getTime() + "";
      // websites.push(website);
      var userId = req.params.userId;
      websiteModel.createWebsiteForUser(userId,website)
        .then(
          function (website) {
            console.log("back "+website);
            res.json(website);
          },
          function (error) {
            res.statusCode(400).send(error);
          }
        )
  }

  function findWebsiteForUser(req,res,next) {
      var id = req.params.userId;
      websiteModel.findAllWebsiteForUser(id)
        .then(
          function (websites) {
            res.json(websites);
          },
          function (err) {
            res.statusCode(400).send(err);
          }
        )

      // var websiteForUser = [];
      // websites.forEach(function (website) {
      //   if(website.developerId === id){
      //     websiteForUser.push(website);
      //   }
      // });
      // // websiteForUser.forEach(function (website) {
      // //   console.log(website);
      // // });
      // res.json(websiteForUser);
  }

  function findWebsiteById(req,res,next) {
    // const web = this.websites.find(website => website.id === websiteId);
    // return new Website(web.id, web.name, web.developerId, web.description);
    var id = req.params.websiteId;
    websiteModel.findWebsiteById(id)
      .then(
        function(website){
          res.json(website);
        },
        function (err) {
          res.statusCode(400).send(err);
        }
      )
    // var web  = websites.find(function(website){
    //   return website.id === id;
    // });
    // var newWeb = {id:web.id, name: web.name, developerId: web.developerId, description: web.description};
    // res.json(newWeb);
  }

  function updateWebsite(req,res,next) {
    // const index: number = this.websites.findIndex(website => website.id === websiteId);
    // this.websites[index] = newWebsite;
    var website = req.body;
    // console.log(website);
    var webId = req.params.websiteId;

    websiteModel.updateWebsite(webId,website)
      .then(
        function(website){
          res.json(website);
        },
        function (err) {
          res.statusCode(400).send(err);
        }
      )
    // var index = websites.findIndex(function (website) {
    //   return website.id === webId;
    // });
    // // console.log(index);
    // // console.log(websites[index]);
    // websites[index] = website;
    // res.json(website);
  }

  function deleteWebsite(req,res,next) {
    // const index: number = this.websites.findIndex(website => website.id === websiteId);
    // this.websites.splice(index, 1);
    var webId = req.params.websiteId;
    websiteModel.deleteWebsite(webId)
      .then(
        function (data) {
          res.json(data);
        },
        function (err) {
          res.statusCode(400).send(err);

        }
      )
    // var index = websites.findIndex(function (website) {
    //   return website.id === webId;
    // });
    // websites.splice(index, 1);
    // res.json(webId);
  }

}
