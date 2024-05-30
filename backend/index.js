const mongoose = require("mongoose")

const connectdb = async () => {
    try {
       const db = await mongoose.connect(process.env.URI)
      console.log("database connected");
    } catch (error) {
      console.log(error);
    }
}

connectdb()

const app = require("./app");
const port = process.env.PORT
app.listen(port, console.log(`server is running at ${port}....`))