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

const today = new Date()

let day = ""

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
	day = today.toLocaleString("eng", { weekday: "long" })

	res.render("index", { kindOfDay: day, itemEls: itemsArr })
})

app.post("/", (req, res) => {
	const newItem = [req.body.newItemInput]
	itemsArr.push(newItem)
	res.redirect('/')
})

app.listen(port, () => console.log(`server run on port::${port}`))
