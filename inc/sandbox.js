var SandCastle = require('sandcastle').SandCastle;

module.exports = {
	run: function(opts, cb) {
		if(typeof(opts.script) === 'undefined') {
			return cb({code: 403, message: 'You must pass a script to sandbox.run'});
		}

		var myCastle = new SandCastle({
		  api: './sandbox/api.js'
		});
		
		var script = myCastle.createScript(opts.script);
		
		script.on('exit', function(err, result) {
			myCastle.kill();
			cb(err, result);
		});
		
		var input = null;
		if(typeof(opts.input) !== 'undefined') {
			// add the input
			input = opts.input;
		}
		
		script.run({
			input: input
		});
	}
};