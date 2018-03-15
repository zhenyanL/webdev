module.exports = function (app) {

  pages = [
    {id:'321', name:'Post 1', websiteId:'456', title:'Lorem'},
    {id:'432', name:'Post 2', websiteId:'456', title:'Lorem'},
    {id:'543', name:'Post 3', websiteId:'456', title:'Lorem'}
  ];


  app.post('/api/website/:websiteId/page',createPage);
  app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
  app.get('/api/page/:pageId',findPageById);
  app.put('/api/page/:pageId',updatePage);
  app.delete('/api/page/:pageId', deletePage);


  function createPage(req,res,next) {
    // const id = Math.random().toString();
    // this.pages.push(new Page(id, name, websiteId, title));
    var websiteId = req.params.websiteId;
    var page = req.body;
    page.id = (new Date()).getTime() + "";
    pages.push(page);
    res.json(page);
  }

  function findAllPagesForWebsite(req,res,next) {
    // const webPages = [];
    // this.pages.forEach(function (page) {
    //   if (page.websiteId === websiteId) {
    //     webPages.push(page);
    //   }
    // });
    var webId = req.params.websiteId;
    var webPages = [];
    pages.forEach(function (page) {
        if (page.websiteId === webId) {
          webPages.push(page);
        }
      });
    res.json(webPages);
  }
  function findPageById(req,res,next) {
    // const page = this.pages.find(page =>  page.id === pageId);
    // return new Page(page.id, page.name, page.websiteId, page.title);
    var pageId = req.params.pageId;
    var page = pages.find(function(page){
      return page.id === pageId;
    });
    res.json(page);
  }
  function updatePage(req,res,next) {
    // const index = this.pages.findIndex(page => page.id === pageId);
    // this.pages[index] = newPage;
    var pageId = req.params.pageId;
    var newPage = req.body;
    var index = pages.findIndex(function(page){
      return page.id === pageId;
    });
    pages[index] = newPage;
    res.json(newPage);
  }
  function deletePage(req,res,next) {
    // const index = this.pages.findIndex(page => page.id === pageId);
    // this.pages.splice(index, 1);
    var pageId = req.params.pageId;
    var index = pages.findIndex(function(page){
      return page.id === pageId;
    });
    pages.splice(index,1);
    res.json(pageId);
  }





}
