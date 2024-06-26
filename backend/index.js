const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const URI = process.env.URI
const connectdb = async () => {
    try {
       const db = await mongoose.connect(URI)
      console.log("database connected");
    } catch (error) {
      console.log(error);
    }
}

connectdb()

const app = require("./app");
const port = process.env.PORT
app.listen(3000, console.log(`server is running at ${port}....`))