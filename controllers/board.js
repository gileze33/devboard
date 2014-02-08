var mongoose = require('mongoose')
var Board = require('../models/board');

module.exports.controller = function(app) {

	// home route
	app.get('/', function(req, res) {
		
		
		res.render('site/home')
	});

}