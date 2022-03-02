var mongoose = require('mongoose');

var Schema = mongoose.Schema; // pour creer une entité

var Contact = new Schema({
   
    FullName : String,
    Phone : Number

});
module.exports =mongoose.model('contacts',Contact);