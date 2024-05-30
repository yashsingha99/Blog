const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
      default : ""
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ]
  },
  { timeStamps: true }
);

userSchema.pre("save", async(next) => {
  if(!this.isModified("password")) 
    return next();
  this.password = await bcrypt.hash(this.password, 10);
  next()
})

userSchema.methods.isPasswordCorrect = async(enteredPassword) => {
    return await bcrypt.compare(enteredPassword, this.password)
}
const User = mongoose.model("User", userSchema);
module.exports = User