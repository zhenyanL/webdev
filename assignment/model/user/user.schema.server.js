var mongoose = require('mongoose');

var websiteSchema = require('../website/website.schema.server');

/*Mongoose added the ability to specify the collection name under the schema, or as the third argument when declaring the model.
Otherwise it will use the pluralized version given by the name you map to the model.
 */

var userSchema = mongoose.Schema({
  userName: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  websites: [websiteSchema]
},{collection:'Users'});

module.exports = userSchema;
