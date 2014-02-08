var mongoose = require('mongoose')
var Board = require('../models/board');

module.exports.controller = function(app) {

	// home route
	app.get('/', function(req, res) {
		var data = {
			Board: {
				widgets: []
			}
		}
		
		for(var i=1; i<=20; i++) {
			data.Board.widgets.push({name: 'test'+i, description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'});
		}
		
		res.render('site/home', data);
	});

}