var mongoose = require('mongoose'), Schema = mongoose.Schema;
var Board = require('./board');

widgetSchema = new Schema( {
	name: String,
	description: String,
	boards: [ Board.Schema ]
}),

Widget = mongoose.model('widget', widgetSchema);

module.exports = Widget;
module.exports.Schema = widgetSchema;