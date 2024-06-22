const User = require("../models/user.model");
const Post = require("../models/post.model");

const register = async (req, res) => {
  try {
    const { username, email, password, fullname } = req.body;
    if (
      [username, fullname, email, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      return res.send(400).json({ mesage: "All credentials are required!!" });
    }
    const isUserExist = await User.findOne({ $or: [{ email }, { username }] });

    if (isUserExist) {
      return res.sendStatus(400);
    }
    const newUser = await User.create({ username, fullname, email, password });

    const user = await User.findById(newUser?._id).select("-password ");
    res.send(200).json({ user, message: "successfully created" });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!password || (!email && !username))
      return res.send(404).json({ message: "Insufficient Data" });
    const isUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!isUser)
      return res.send(404).json({ message: "email or username is wrong" });
    const checkPassword = await isUser.isPasswordCorrect(password);
    if (!checkPassword)
      return res
        .send(404)
        .json({ message: "Password must same with email or username" });
    const user = await User.findById(isUser._id).select("-password");
    res.send(200).json({ user, message: "successfully logged in" });
  } catch (error) {
    console.log("login => ", error);
  }
};

//TODO

const updateUser = async (req, res) => {};

const addToFavourite = async () => {
  try {
    const { post, user } = req.body;

    if (!post) return res.status(400).json({ message: "Insufficient Data" });

    const checkUser = await User.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });

    if (!checkUser)
      return res.status(400).json({ message: "creater doesn't exist" });

    const checkPost = await Post.findById(post._id);
    if (!checkPost)
      return res.status(400).json({ message: "post doesn't find" });

    const add = await User.findByIdAndUpdate(
      checkUser._id,
      {
        $addToSet: { favourate: checkPost._id },
      },
      {
        new: true,
      }
    );

    if (!add) return res.status(500).json({ message: "Internel Issue" });

    res.status(400).json({ message: "sucessfully added to favourite" });
  } catch (error) {
    console.log("addToFavourite", error);
  }
};

const fetchUserPosts = async (req, res) => {
    try {
      const { user } = req.body;
      if (!user) return res.status(400).json({ message: "Insufficient data" });
  
      const checkUser = await User.findOne({
        $or: [{ email: user?.email }, { username: user?.username }],
      })
        .populate("posts")
        .then(async (res) => {});
  
      if (!checkUser)
        return res.status(400).json({ message: "user doesn't exist" });
  
      const allposts = checkUser.posts;
  
      if (!allposts)
        return res.status(400).json({
          message: `${
            user?.username ? user.username : "user"
          } isn't created any post`,
        });
  
      res
        .status(200)
        .json({ posts: allposts, message: " successfully fetched posts " });
    } catch (error) {
      console.log(" fetchUserPosts => ", error);
    }
  };
  
module.exports = { register, login, updateUser, addToFavourite, fetchUserPosts };
