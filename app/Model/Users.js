var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var UsersSchema = new Schema({
    Firstname: {type:String , required:true},
	Lastname: {type:String , required:true},
	Gender: {type:String , required:true},
	Date_of_birth: { type: Date, required: true },
    Username: {type:String, required: true},
    Password: {type:String , required: true},
    Date_created: { type: Date, required: true, default: new Date() },
	Date_updated: { type: Date, required: true, default: new Date() },

})
UsersSchema.index({ '$**': 'text', "Firstname.name": 'text' });
module.exports = mongoose.model('Users' ,  UsersSchema );
