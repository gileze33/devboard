var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

// database connection
var mongoURL = 'mongodb://localhost/devboard';
if(typeof(process.env.MONGOLAB_URI) !== 'undefined') mongoURL = process.env.MONGOLAB_URI;
var mongoose = require('mongoose');
mongoose.connect(mongoURL);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
	if(file.substr(-3) == '.js') {
		route = require('./controllers/' + file);
		route.controller(app);
	}
});




app.listen(process.env.PORT || 4000);
