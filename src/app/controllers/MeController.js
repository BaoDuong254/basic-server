const Course = require("../models/Course")
const {multipleMongooseToObject} = require("../../util/mongoose")

class MeController {
	storedCourses(req, res, next) {
		Promise.all([
			Course.find({}).sortable(req),
			Course.countDocumentsDeleted(),
		])
			.then(([courses, deleteCount]) => {
				res.render("me/stored-courses", {
					deleteCount,
					courses: multipleMongooseToObject(courses),
				})
			})
			.catch(next)
	}
	trashCourses(req, res, next) {
		Course.findDeleted({})
			.then((courses) => {
				res.render("me/trash-courses", {
					courses: multipleMongooseToObject(courses),
				})
			})
			.catch(next)
	}
}
module.exports = new MeController()
