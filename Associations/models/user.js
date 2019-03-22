var mongoose = require("mongoose");
// USER - name, email
var userSchema = new mongoose.Schema({
	name: String,
	email: String,
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId, // Way to especify that this is an ID
			ref: "Post"
		}
	]
}, {usePushEach: true});

module.exports = mongoose.model("User", userSchema);