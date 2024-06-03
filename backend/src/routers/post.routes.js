const express = require("express");
const Router = express.Router()
const {addPost,
     updatePost,
    deletePost,
    fetchAllPosts,
    fetchTitles,
    addComments,
    incrementViews,
    incrementLikes,
    fetchUserPosts,
    decrementLikes
 } = require("../controller/post.controller")

Router.post("/", addPost);
Router.post("/updatePost", updatePost);
Router.post("/deletePost", deletePost);
Router.post("/fetchTitles", fetchTitles);
Router.post("/fetchAllPosts", fetchAllPosts);
Router.post("/addComments", addComments);
Router.post("/incrementViews", incrementViews);
Router.post("/incrementLikes", incrementLikes);
Router.post("/decrementLikes", decrementLikes);
Router.post("/fetchUserPosts", fetchUserPosts);

module.exports = Router

