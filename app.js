import express from "express"
import bodyParser from "body-parser"
import https from "https"
import path from "path"
import { fileURLToPath } from "url"

const port = 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

let itemsArr = []
let foodItems = []

const today = new Date()

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

app.get("/", (req, res) => {
	day = today.toLocaleString("eng", options)

	res.render("index", { listTitle: day, itemEls: itemsArr })
})

app.post("/", (req, res) => {
	const newItem = [req.body.newItemInput]
	if (req.body.list === "food") {
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

app.listen(port, () => {
	console.log(`server run on port::${port}`)
})
