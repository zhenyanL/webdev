

module.exports = function (app) {
  // id: string, widgetType: string, pageId: string, size: string, text: string, width: string, url: string
  var widgets =   [
    {id:'123', widgetType:'HEADING', pageId:'321', size:'2', text:'GIZMODO', width:'100%', url:'url'},
    {id:'234', widgetType:'HEADING',  pageId:'321',  size:'4', text:'Lorem ipsum',  width:'100%', url:'url'},
  {id:'345', widgetType:'IMAGE',  pageId:'321',  size:'4', text:'text',  width:'100%', url:'http://lorempixel.com/400/200/'},
  {id:'456', widgetType:'HTML',  pageId:'321', size: '4', text:'<p>Lorem ipsum</p>',  width:'100%', url:'url'},
  {id:'567', widgetType:'HEADING',  pageId:'321',  size:'4', text:'Lorem ipsum',  width:'100%', url:'http://lorempixel.com/400/200/'},
  {id:'678',widgetType: 'YOUTUBE',  pageId:'321',  size:'4', text:'text', width:'100%', url:'https://www.youtube.com/embed/4jtVx4_QpKA'},
  {id:'789', widgetType:'HTML',  pageId:'321',  size:'4', text:'<p>Lorem ipsum</p>',  width:'100%', url:'url'},
  ];


  // var multer = require('multer');
  // // var upload = multer({dest: __dirname+'/../../src/assets/uploads'});
  // var upload = multer({ dest: __dirname+'/../../src/assets/uploads' });
  var multer = require('multer');
  var upload = multer({dest: __dirname+'../../../src/assets/uploads/'});

  app.post('/api/page/:pageId/widget',createWidget);
  app.get('/api/page/:pageId/widget',findAllWidgetsForPage);
  app.get('/api/widget/:widgetId',findWidgetById);
  app.put('/api/widget/:widgetId',updateWidget);
  app.delete('/api/widget/:widgetId',deleteWidget);
  app.put('/api/page/:pageId/widget',changeIndex);
  app.post('/api/upload', upload.single('myFile') ,uploadImage);



  function uploadImage(req,res,next) {
      // var widgetId = req.body.widgetId;
      var websiteId = req.body.websiteId;
      var pageId = req.body.pageId;
      var userId = req.body.userId;
      var width = req.body.width;
      var text = req.body.text;
    //    console.log(websiteId);
    // console.log(pageId);
    // console.log(userId);
    // console.log(width);
    // console.log(text);
      var widgetId = (new Date()).getTime() + "";
      var widgetType = 'IMAGE';
      var myFile = req.file;
      console.log(myFile);
      var filename = myFile.filename;
      var size = myFile.size;

      var url = 'assets/uploads/'+filename;
      var widget = {id:widgetId,widgetType:widgetType,pageId: pageId,size: size,text:text,width:width,url:url};
      console.log(widget);
      widgets.push(widget);
      // var callBackUrl = process.env.CLI_ROOT+"/user/"+userId+"/website/"+websiteId
      // var callBackUrl = environment.baseUrlClien+"/user/"+userId+"/website/"+websiteId;

      // var callBackUrl = "assignment/#/user/"+userId+'/website/'+websiteId;
      // var callBackUrl = '/user/'+userId+'/website/'+websiteId+'/page/'+pageId+'/widget'
      // var callBackUrl = "../../src/app//assignment/#/user/"+userId+"/website/"+websiteId;
    // 'user/:uid/website/:wid/page/:pid/widget'
      var callBackUrl = "https://web-zhenyan.herokuapp.com/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
      res.redirect(callBackUrl);
      // res.sendFile("index.html");
      // res.sendFile(__dirname+'../../../src/index.html')


  }

  // PUT /page/:pageId/widget?initial=index1&final=index2

  function changeIndex(req,res,next) {

    // const temp = this.widgets[startIndex];
    // this.widgets[startIndex] = this.widgets[endIndex];
    // this.widgets[endIndex] = temp;
    var pageId = req.params.pageId;
    var foundWidgets = [];
    for(var i = 0; i < widgets.length; i++){
      if(widgets[i].pageId === pageId){
        foundWidgets.push(widgets[i]);
      }
    }
    var initial = req.query["initial"];
    var final = req.query["final"];
    var temp = foundWidgets[initial];
    foundWidgets[initial] = foundWidgets[final];
    foundWidgets[final] = temp;
    res.send(pageId);


  }

    function createWidget(req,res,next) {
    // const id = Math.random().toString();
    // this.widgets.push(new Widget(id, widgetType, pageId, size, text, width, url));
    var pageId = req.params.pageId;
    var widget = req.body;
    widget.id = (new Date()).getTime() + "";
    widgets.push(widget);
    res.json(widget);

  }

  function findAllWidgetsForPage(req,res,next) {
    //  const pageWidget = [];
    // this.widgets.forEach(function (widget) {
    //   if (widget.pageId === pageId) {
    //     pageWidget.push(widget);
    //   }
    // });
    // return pageWidget;

    var pageId = req.params.pageId;
    var foundWidgets = [];
    for(var i = 0; i < widgets.length; i++ ){
      if(widgets[i].pageId == pageId){
        foundWidgets.push(widgets[i]);
      }
    }
    res.json(foundWidgets);
  }
  function findWidgetById(req,res,next) {
// const widgetFound = this.widgets.find(widget =>  widget.id === widgetId);
    // return new Widget(widgetFound.id, widgetFound.widgetType, widgetFound.pageId, widgetFound.size,
    //   widgetFound.text, widgetFound.width, widgetFound.url);
    var widgetId = req.params.widgetId;
    var foundWidget = widgets.find(function (widget) {
          return widget.id === widgetId;
    });
    res.json({id: foundWidget.id, widgetType:foundWidget.widgetType, pageId: foundWidget.pageId, size: foundWidget.size,
    text: foundWidget.text,width:foundWidget.width,url:foundWidget.url});
  }
  function updateWidget(req,res,next) {
    // const index = this.widgets.findIndex(widget => widget.id === widgetId);
    // this.widgets[index] = newWidget;
    var widgetId = req.params.widgetId;
    var newWidget = req.body;
    var index = widgets.findIndex(function (widget) {
      return widget.id === widgetId;
    });
    widgets[index] = newWidget;
    res.json(newWidget);
  }

  function deleteWidget(req,res,next) {
// const index = this.widgets.findIndex(widget => widget.id === widgetId);
    // this.widgets.splice(index, 1);

    var widgetId = req.params.widgetId;
    var index = widgets.findIndex(function (widget) {
      return widget.id === widgetId;
    });
    widgets.splice(index,1);
    res.json(widgetId);
  }




}
