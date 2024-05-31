const User = require("../models/user.model");
const Post = require("../models/post.model");

const register = async (req, res) => {
    try {
        const { username, email, password, fullname } = req.body;
        if ([username,fullname ,email, password].some((field) => field?.trim() === "")) {
          return res.send(400).json({mesage :  "All credentials are required!!"});
        }
        const isUserExist = await User.findOne({ $or:[{email}, {username}] });

        if (isUserExist) {
          return res.sendStatus(400);
        }
        const newUser = await User.create({ username,fullname ,email, password });
      
        const user = await User.findById(newUser?._id).select(
          "-password "
        );
         res.send(200).json({user, message : "successfully created"});
      } catch (error) {
        console.log(error);
      }
};

const login = async (req, res) => {
    try {
        const {username, password, email} = req.body;
    
        if(!password || (!email && !username))
            return res.send(404).json({message : "Insufficient Data"})
        const isUser = await User.findOne({
            $or:[{email}, {username}]
        })
    
        if(!isUser)
            return res.send(404).json({message : "email or username is wrong"})
        const checkPassword = await isUser.isPasswordCorrect(password)
        if(!checkPassword)
            return res.send(404).json({message: "Password must same with email or username"})
        const user = await User.findById(isUser._id).select(
            "-password"
        )
        res.send(200).json({user, message: "successfully logged in"})
        
    } catch (error) {
        console.log(error);
    }

};

const updateUser = async (req, res) => {

};

module.exports = { register, login, updateUser };