const User = require("../models/user.model");
const Post = require("../models/post.model");

const addPost = async (req, res) => {
   try {
     const {url, postname, content} = req.body;
     if(!url || !postname || !content) 
         return res.status(400).json({message : "Insufficient Data"})
     const createPost = await Post.create({
         title : postname,
         content,
         path : url
     })
     if(!createPost)
         return res.status(400).json({message : "Internal Issue"});
     res.status(200).json({message : "successfully post created" })
   } catch (error) {
     console.log("addPost => ", error);
   }
};
const updatePost = async (req, res) => {};
const deletePost = async (req, res) => {};
const allPosts = async (req, res) => {};
const fetchTitles = async (req, res) => {};

module.exports = { addPost, updatePost, deletePost, allPosts, fetchTitles };
