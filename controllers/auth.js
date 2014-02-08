var mongoose = require('mongoose')
var User = require('../models/user');

module.exports.controller = function(app) {

	// home route
	app.get('/login', function(req, res) {
		
		
		res.render('auth/login')
	});

}