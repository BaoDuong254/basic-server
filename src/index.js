const express = require("express")
const path = require("path")
const favicon = require("serve-favicon")
// const morgan = require("morgan")
const methodOverride = require("method-override")
const {engine} = require("express-handlebars") // Import đúng cách từ express-handlebars
const app = express()
const port = 3000
const SortMiddleware = require("./app/middlewares/SortMiddleware")
const route = require("./routes")
const db = require("./config/db")
const handlebars = require("./helpers/handlebars")
app.use(favicon(path.join(__dirname, "public", "favicon.ico")))
// Connect to DB
db.connect()
app.use(express.static(path.join(__dirname, "public")))
app.use(
	express.urlencoded({
		extended: true,
	})
)
app.use(express.json())
app.use(methodOverride("_method"))

// Custom middleware
app.use(SortMiddleware)
// HTTP logger
// app.use(morgan("combined"))

// Template engine
app.engine(
	".hbs",
	engine({
		extname: ".hbs",
		helpers: require("./helpers/handlebars"),
	})
) // Sử dụng engine từ express-handlebars
app.set("view engine", ".hbs")
app.set("views", path.join(__dirname, "resources", "views"))

// Route init
route(app)

// Start server
app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})
