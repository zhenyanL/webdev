var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model("Widget",widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;


module.exports = widgetModel;


// Function Signature
// createWidget(pageId, widget)
// findAllWidgetsForPage(pageId)
// findWidgetById(widgetId)
// updateWidget(widgetId, widget)
// deleteWidget(widgetId)
// reorderWidget(pageId, start, end)

function createWidget(pageId,widget) {
  return widgetModel.create(widget)
    .then(
      function (createdWidget) {
        pageModel.findPageById(pageId)
          .then(
            function (page) {
              console.log("position:"+page.widgets.length);
              createdWidget.position = page.widgets.length;
              page.widgets.push(createdWidget);
              console.log(page);
              createdWidget.save();
              // pageModel.updatePage(pageId,page);
              page.save();
            }
          );
        return createdWidget;
      }
    );
}

function findAllWidgetsForPage(pageId) {
  return widgetModel.find({pageId:pageId});
}

function findWidgetById(widgetId) {
  return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
  return widgetModel.findByIdAndUpdate(widgetId,widget);
}

function deleteWidget(widgetId) {


  widgetModel.findById(widgetId).then(function(widget) {
    console.log("delete");
    console.log("delete"+widget.pageId);
    pageModel.findPageById(widget.pageId).then(function(page){
      page.widgets.pull({_id: widgetId});
      page.save();
    })
  });

  widgetModel.findById(widgetId).then(function(widget) {
    var index = widget.position;
    updatePosition(widget.pageId, index);
  });
  return widgetModel.remove({_id: widgetId});

  //
  //
  // return widgetModel.findByIdAndRemove(widgetId)
  //   .then(
  //     function (widget) {
  //       pageModel.findPageById(widget.pageId)
  //         .then(
  //           function (page) {
  //             page.widgets.pull({_id: widgetId});
  //             page.save();
  //             // return widget;
  //             return widget;
  //           }
  //         );
  //       return widget;
  //     }
  //   );
}

function updatePosition (pageId, position) {
  console.log("update method");
  return widgetModel.find({pageId:pageId}, function (err, widgets) {
    widgets.forEach (function (widget) {
      if(widget.position > position){
        widget.position--;
        widget.save();
      }
    })
  })
}

function reorderWidget(pageId,start,end) {
      return widgetModel.findAllWidgetsForPage(pageId)
        .then(
          function(widgets){
            widgets.forEach(function(widget){
              if(start < end){
                if(widget.position === start){
                  widget.position = end;
                  widget.save();
                }
                else if(widget.position > start && widget.position <= end){
                  widget.position--;
                  widget.save();
                }
              }
              else{
                if(widget.position === start){
                  widget.position = end;
                  widget.save();
                }
                else if(widget.position >= end && widget.position < start){
                  widget.position++;
                  widget.save();
                }
              }
            });
            return widgets;
          }
        );
}
