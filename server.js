var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var url = require('url');
var less = require('less');

// database connection
var mongoURL = 'mongodb://localhost/devboard';
if(typeof(process.env.MONGOLAB_URI) !== 'undefined') mongoURL = process.env.MONGOLAB_URI;
var mongoose = require('mongoose');
mongoose.connect(mongoURL);

// setup view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// session config
var sessionSecret = process.env.SESSION_SECRET || 'l8h4sl8hgl8';
app.use(express.cookieParser(sessionSecret+'_cookie'));

if(typeof(process.env.REDISTOGO_URL) !== 'undefined') {
	var RedisStore = require('connect-redis')(express);
	var redisUrl = url.parse(process.env.REDISTOGO_URL);
	var redisAuth = redisUrl.auth.split(':');
	
	app.use(express.session({ 
		secret: sessionSecret, 
		store: new RedisStore({
			host: redisUrl.hostname,
			port: redisUrl.port,
			db: redisAuth[0],
			pass: redisAuth[1]
		})  
	}));
}
else {
	app.use(express.session({secret: sessionSecret}));
}


app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



// css route
app.get('/styles.css', function(req, res) {
	/*if(compiledLess !== '') {
		res.setHeader('Content-type', 'text/css');
		return res.send(200, compiledLess);
	}*/
	
	fs.readFile(__dirname+'/less/compile.less', function (err, data) {
		if (err) {
			console.log(err);
			
			return res.send(500, {
				error: err,
				message: 'An error occured compiling the stylesheet',
				module: 'server',
				url: '/styles.css'
			});
		}
		
		var parser = new(less.Parser)({
		    paths: [__dirname, __dirname+'/less'], // Specify search paths for @import directives
		    filename: 'compile.less' // Specify a filename, for better error messages
		});
		
		parser.parse(data.toString(), function (e, tree) {
		    compiledLess = tree.toCSS({ compress: false }); // Minify CSS output
		
			res.setHeader('Content-type', 'text/css');
			res.send(compiledLess);
		});
	});
});



// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
	if(file.substr(-3) == '.js') {
		route = require('./controllers/' + file);
		route.controller(app);
	}
});




app.listen(process.env.PORT || 4000);
