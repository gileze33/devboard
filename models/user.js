var mongoose = require('mongoose'), Schema = mongoose.Schema;

userSchema = new Schema( {
	name: String,
	email: String,
	password: String
}),

User = mongoose.model('user', userSchema);

module.exports = User;
module.exports.Schema = userSchema;