const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())

require("dotenv/config")

const urlModel = require("./model/url")

app.get("/@:shortname", async (req, res) => {
	try {
		const findUrl = await urlModel.findOne({ shortName: req.params.shortname })
		if (findUrl === null) {
			return res.send("<h1>error</error>")
		}
		return res.redirect(findUrl.url)
	} catch (err) {
		res.send("<h1>error</error>")
	}
})

mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
})
//app.listen(process.env.PORT || 3000)
module.exports = app
