'use strict';

var mongoose = require('mongoose');
var Phone = require('phone');
var encrypt = require('mongoose-encryption');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  name: String,
  surname: String,
  email: {
  	type: String,
  	unique: true,
  	required: "Email address is required",
  	match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter valid email address']
  },
  phone: {
  	type: String,
  	unique: true,
  	required: "Phone number is required",
  }
});

ClientSchema.path('phone').validate(function(value){
	if(Phone(value)[1]==='GBR'){
		return true;
	}
	return false;
},"Please provide correct phone number as in UK");

//encrypting phone number
// var encKey = "ZZEWfMSBK6ZdgaPHGY2gt3b5P0Oo4wGxwNlfGnPuFxI=";
// var sigKey = "dU2dCPLr7d+Frfcn0hWFG6+A3ZBZDtOCNqB6DTvCmYEksu72EUbkJRMOTKk2l0zhDpbqcGy51Xo1yGlKIVq9+Q==";
// ClientSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey, encryptedFields: ['phone'] });

module.exports = mongoose.model('Clients', ClientSchema);