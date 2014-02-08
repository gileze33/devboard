var fs = require('fs');

exports.api = {
	devboard: {
		
	},
	require: function(module) {
		// require function to allow them to include some modules
		
		if(module === 'request') {
			return require('request');
		}
		if(module === 'less') {
			return require('less');
		}
		
		
		// if we get to here then the module isn't found
		throw 'Module not found!';
	},
	setTimeout: function(callback, timeout) {
		setTimeout(callback, timeout);
	}
}