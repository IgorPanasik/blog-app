const mongoose = require("mongoose");

const CategoryScheme = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Category", CategoryScheme);
