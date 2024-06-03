const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    path: {
      type: String,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
    comments: [
      {
        comment : {
         type: String,
        },
        sender : {
          type : mongoose.Schema.Types.ObjectId,
          ref : "User"
        }

      },
    ],
    likes: {
        type : Number,
       default : 0
    },
    views: {
        type:Number,
       default:0
    }
  },
  { timeStamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
