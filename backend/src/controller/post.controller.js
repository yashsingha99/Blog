const User = require("../models/user.model");
const Post = require("../models/post.model");

const addPost = async (req, res) => {
   try {
     const {url, postname, content, user} = req.body;
     if(!url || !postname || !content) 
         return res.status(400).json({message : "Insufficient Data"})
     const checkUser = await User.findOne({$or : [{email : user.email},{username : user.username}]})
     if(!checkUser)
        return res.status(400).json({message: "creater doesn't exist"});

     const createPost = await Post.create({
         title : postname,
         content,
         path : url,
         creator : checkUser._id
     })
     if(!createPost)
         return res.status(400).json({message : "Internal Issue"});
     const putPost = await User.findByIdAndUpdate(
        checkUser._id,
        {
          $addToSet: { posts: createPost._id } 
        },
        {
          new: true 
        }
     ) 
     if(!putPost)
        return res.status(400).json({message : "Internal Issue"});

     res.status(200).json({message : "successfully post created" })
   } catch (error) {
     console.log("addPost => ", error);
   }
};
const updatePost = async (req, res) => {

};
const deletePost = async (req, res) => {

};
const allPosts = async (req, res) => {

};
const fetchTitles = async (req, res) => {

};
const incrementViews = async(req, res) => {
  const{ post} = req.body;
  if(!post) 
     return res.status(400).json({message : "post isn't provide"})
    
}
const addComments = async (req, res) => {

}
module.exports = { addPost, updatePost, deletePost, allPosts, fetchTitles };
