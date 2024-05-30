const mongoose = require("mongoose");

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
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: Post
        }
    ]
  },
  { timeStamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User