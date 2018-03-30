var mongoose = require('mongoose');
var Widget = require('../widget/widget.schema.server');


var pageSchema = mongoose.Schema({
    //
    // userId: {type: mongoose.Schema.ObjectId, ref: "Website"},

  websiteId: {type: mongoose.Schema.ObjectId, ref: "Website"},
  name: String,
  title: String,
  description: String,
  widgets: [Widget],
  dateCreate:{type: Date, default: Date.now()}
},{collection: "Pages"}
);

module.exports = pageSchema;


// _website	Reference to Website	Refers to parent website
// name	String
// title	String
// description	String
// widgets	[Widget]	Array of references to child widget instances
// dateCreated	Date	Current date
