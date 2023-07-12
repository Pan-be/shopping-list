import express from "express"
import bodyParser from "body-parser"
import https from "https"
import path from "path"
import { fileURLToPath } from "url"

const port = 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
	const today = new Date()

	let day = ""

	day = today.toLocaleString("eng", { weekday: "long" })

	res.render("index", { kindOfDay: day })
})

app.listen(port, () => console.log(`server run on port::${port}`))
