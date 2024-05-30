const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv");
// const { default: mongoose } = require("mongoose");
app.use(cookieParser())
dotenv.config();
 


module.exports = app