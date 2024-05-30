const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv");
app.use(cookieParser())
dotenv.config();

 //!...................\\ 
//*      Routers        \\

const userRoute = require("./src/routers/user.routes")
app.use("api/user/", userRoute)

const postRoute = require("./src/routers/post.routes")
app.use("api/post/", postRoute)



module.exports = app