var mongoose = require('mongoose'), Schema = mongoose.Schema;
var Widget = require('./widget');

boardSchema = new Schema( {
	name: String,
	widgets: [ Widget.Schema ]
}),

Board = mongoose.model('board', boardSchema);

module.exports = Board;
module.exports.Schema = boardSchema;