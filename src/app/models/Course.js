const {create} = require("express-handlebars")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const slug = require("mongoose-slug-generator")
const mongooseDelete = require("mongoose-delete")
const AutoIncrement = require('mongoose-sequence')(mongoose);
const CourseSchema = new Schema(
    {
        _id: {type: Number},
		name: {type: String, required: true},
		description: {type: String},
		image: {type: String},
		videoID: {type: String, required: true},
		level: {type: String},
		slug: {type: String, slug: "name", unique: true},
	},
    {
        _id: false,
		timestamps: true,
	}
)
// Custom query helpers
CourseSchema.query.sortable = function (req) {
	if (req.query.hasOwnProperty("_sort")) {
		const isValidType = ["asc", "desc"].includes(req.query.type)
		return this.sort({
			[req.query.column]: isValidType ? req.query.type : "desc",
		})
	}
	return this
}
// Add plugin
CourseSchema.plugin(AutoIncrement)
mongoose.plugin(slug)
CourseSchema.plugin(mongooseDelete, {deletedAt: true, overrideMethods: "all"})
module.exports = mongoose.model("Course", CourseSchema)
