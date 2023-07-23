import express from "express"
import bodyParser from "body-parser"
import https from "https"
import path from "path"
import { fileURLToPath } from "url"
import mongoose from "mongoose"
import "dotenv/config"

const port = process.env.PORT
const adminName = process.env.ADM_NAME
const adminPassword = process.env.ADM_PASSWORD


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

mongoose.connect(`mongodb+srv://${adminName}:${adminPassword}@cluster0.axfb9st.mongodb.net/?retryWrites=true&w=majority/shoppingListDB`)


const itemSchema = {
	itemName: String
}

const Item = mongoose.model('Item', itemSchema
)

const item = new Item({
	itemName: 'Welcome to your shopping list'
})

const item2 = new Item({
	itemName: 'Hit the + button to add a new to-buy-item'
})

const item3 = new Item({
	itemName: '<----Hit this to delete an item'
})

const defaultItems = [item, item2, item3]



app.get("/", (req, res) => {
	day = today.toLocaleString("eng", options)

	Item.find({}).then((foundItems) => {

		if (foundItems.length === 0) {
			Item.insertMany(defaultItems)
			res.redirect('/')
		} else {

			res.render("index", {
				listTitle: day,
				itemEls: foundItems,
				year: year,
			})
		}
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
