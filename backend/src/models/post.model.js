const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    path: {
      type: String,
    },
    Creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    content: {
      type: String,
    },
    comments: [
      {
        type: String,
      },
    ],
    likes:{
        type : Number
    },
    views:{
        type:Number
    }
  },
  { timeStamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
