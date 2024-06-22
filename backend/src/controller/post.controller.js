const User = require("../models/user.model");
const Post = require("../models/post.model");

const addPost = async (req, res) => {
  try {
    const { url, postname, content, user } = req.body;
    if (!url || !postname || !content)
      return res.status(400).json({ message: "Insufficient Data" });
    const checkUser = await User.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });
    if (!checkUser)
      return res.status(400).json({ message: "creater doesn't exist" });

    const createPost = await Post.create({
      title: postname,
      content,
      path: url,
      creator: checkUser._id,
    });

    if (!createPost) return res.status(400).json({ message: "Internal Issue" });

    const putPost = await User.findByIdAndUpdate(
      checkUser._id,
      {
        $addToSet: { posts: createPost._id },
      },
      {
        new: true,
      }
    );
    if (!putPost) return res.status(400).json({ message: "Internal Issue" });

    res.status(200).json({ message: "successfully post created" });
  } catch (error) {
    console.log("addPost => ", error);
  }
};

const updatePost = async (req, res) => {
 try {
   const { url, postname, content, user, prevPost } = req.body;
   if (!url || postname || !content || !user || !prevPost)
     return res.status(400).json({ message: "Insufficient Data" });
   const checkUser = await User.findOne({
     $or: [{ email: user.email }, { username: user.username }],
   });
   if (!checkUser)
     return res.status(400).json({ message: "creater doesn't exist" });
   const findPost = await Post.findByIdAndUpdate(prevPost._id, 
     {
     title: postname,
     content,
     path: url,
     creator: checkUser._id,
   },
   {
     new : true
   }
 );
   if(!findPost) 
      return res.status(400).json({message : "post doesn't exist"})
 } catch (error) {
   console.log("updatePost", error);
 }
};

const deletePost = async (req, res) => {
  try {
    const {post} = req.body;
    if (!post)
      return res.status(400).json({ message: "Insufficient Data" });
    const findPost = await Post.findByIdAndUpdate(post._id, 
      {
      status : false
    },
    {
      new : true
    }
  );
    if(!findPost) 
       return res.status(400).json({message : "post doesn't exist"})
    res.status(200).json({message : "successfully deleted post"})
  } catch (error) {
    console.log("deletePost", error);
  }
};

const fetchAllPosts = async (req, res) => {
  try {
    const {user} = req.body;
    if (!user)
      return res.status(400).json({ message: "Insufficient Data" });
    const allPost = await Post.find({})
    if(!allPost) 
       return res.status(400).json({message : "posts doesn't exist"})
    res.status(200).json({Posts : allPost, message : "successfully deleted post"})
  } catch (error) {
    console.log("fetchAllPosts", error);
  }
};

const fetchTitles = async (req, res) => {

};

const incrementViews = async (req, res) => {
  try {
    const { post } = req.body;
    if (!post) return res.status(400).json({ message: "post isn't provide" });
    const checkPost = await Post.findById(post._id);
    if (!checkPost)
      return res.status(400).json({ message: "Post isn't exist" });
    const updatePost = await Post.findByIdAndUpdate(
      post._id,
      {
        $inc: { views: 1 },
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ post: updatePost, message: "successfully increment views" });
  } catch (error) {
    console.log("incrementViews => ", error);
  }
};

const incrementLikes = async (req, res) => {
  try {
    const { post } = req.body;
    if (!post) return res.status(400).json({ message: "post isn't provide" });
    const checkPost = await Post.findById(post._id);
    if (!checkPost)
      return res.status(400).json({ message: "Post isn't exist" });
    const updatePost = await Post.findByIdAndUpdate(
      post._id,
      {
        $inc: { likes: 1 },
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ post: updatePost, message: "successfully increment likes" });
  } catch (error) {
    console.log(" incrementLikes => ", error);
  }
};

const decrementLikes = async (req, res) => {
  try {
    const { post } = req.body;
    if (!post) return res.status(400).json({ message: "post isn't provide" });
    const checkPost = await Post.findById(post._id);
    if (!checkPost)
      return res.status(400).json({ message: "Post isn't exist" });
    const updatePost = await Post.findByIdAndUpdate(post._id, {
      $dcr: { likes: 1 },
    });
    res
      .status(200)
      .json({ post: updatePost, message: "successfully increment likes" });
  } catch (error) {
    console.log(" incrementLikes => ", error);
  }
};

const addComments = async (req, res) => {
  try {
    const { post, comment, user } = req.body;
    if (!post || !comment || !user)
      return res.status(400).json({ message: "Insufficient Data" });

    const checkPost = await Post.findById(post._id);
    if (!checkPost)
      return res.status(400).json({ message: "Post isn't exist" });
    const checkUser = await User.findOne({
      $or: [{ email: user?.email }, { username: user?.username }],
    });

    if (!checkUser)
      return res.status(400).json({ message: "User doesn't exist" });

    const addComment = await Post.findByIdAndUpdate(
      post._id,
      {
        $addToSet: { comments: { comment, sender: checkUser._id } },
      },
      {
        new: true,
      }
    )
      .populate("comments")
      .populate("creator");

    if (!addComment) return res.status(400).json({ message: "Internel Issue" });
    res
      .status(200)
      .json({ post: addComment, message: "successfully comment added" });
  } catch (error) {
    console.log(" addComment => ", error);
  }
};

const addSeac

module.exports = {
  addPost,
  updatePost,
  deletePost,
  fetchAllPosts,
  fetchTitles,
  addComments,
  incrementViews,
  incrementLikes,
  decrementLikes,
};
