const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv");
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

dotenv.config();

 //!...................\\ 
//*      Routers        \\

app.get("/", (req, res) => {
    res.send("API is running123");
  }); 

const userRoute = require("./src/routers/user.routes")
app.use("/user", userRoute)

// const postRoute = require("./src/routers/post.routes")
// app.use("/post", postRoute)



module.exports = app