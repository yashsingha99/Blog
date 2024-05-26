const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cookiesParser = require("cookies-parser")
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
app.use(bodyParser)
app.use(cookiesParser)
dotenv.config();
 
const connect = mongoose.connect(process.env.URI)

module.exports = app