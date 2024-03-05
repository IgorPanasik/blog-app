const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		profilePic: {
			type: String,
			default: "",
		},
		resetToken: {
			type: String,
		},
		resetTokenExpiration: {
			type: Date,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserScheme);
