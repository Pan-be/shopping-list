import express from "express"
import bodyParser from "body-parser"
import https from "https"
import path from "path"
import { fileURLToPath } from "url"
import mongoose from "mongoose"

const port = 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const today = new Date()

let year = today.getFullYear()

let day = ""
const options = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
}

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

mongoose.connect('mongodb://localhost:27017/shoppingListDB')

app.get("/", (req, res) => {
	day = today.toLocaleString("eng", options)

	res.render("index", {
		listTitle: day,
		itemEls: itemsArr,
		year: year,
	})
})

app.post("/", (req, res) => {
	const newItem = [req.body.newItemInput]
	if (req.body.list === "Food") {
		foodItems = [...foodItems, newItem]
		res.redirect("/food")
	} else {
		itemsArr = [...itemsArr, newItem]
		res.redirect("/")
	}
})

app.get("/food", (req, res) => {
	res.render("index", {
		listTitle: "Food list",
		itemEls: foodItems,
	})
})

app.post("/food", (req, res) => {
	const newFood = [req.body.newItemsInput]
	foodItems = [...foodItems, newFood]
	res.redirect("/food")
})

app.get("/about", (req, res) => {
	res.render("about", { year: year })
})

app.listen(port, () => {
	console.log(`server run on port::${port}`)
})
