const express = require("express");
const Router = express.Router()
const {addPost, updatePost, deletePost, allPosts, fetchTitles } = require("../controller/post.controller")

Router.post("/", addPost);

module.exports = Router

