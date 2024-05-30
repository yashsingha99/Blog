const User = require("../models/user.model");
const Post = require("../models/post.model");

const register = async (req, res) => {
  try {
      const { username, email, fullname, password, avatar } = req.body
      if(!username && !fullname && !password && !email)
          return res.send(400).json({message : "Insufficient Data"});
      const isExist = await User.findOne({
        $or:[email, username]
      }) 
      if(isExist) {
        return res.send(400).json({message : "user with email or username already exist"})
      }
      if(!avatar){
         const newUser = await User.create({
          username,
          fullname,
          password
         })
         res.send(200).json({newUser, message : "successfully created"})
      } 
      else {
          const newUser = await User.create({
              username,
              fullname,
              password,
              avatar
          })    
         res.send(200).json({newUser, message : "successfully created"})
      }
  } catch (error) {
    console.log("register => ", error);
  }
};

const login = async (req, res) => {
    try {
        const {username, password, email} = req.body;
    
        if(!password && (!email || !username))
            return res.send(400).json({message : "Insufficient Data"})
    
        const isUser = await User.findOne({
            $or:[email, username]
        })
    
        if(!isUser)
            return res.send(400).json({message : "email or username is wrong"})
        const checkPassword = await isUser.isPasswordCorrect(password)
        if(!checkPassword)
            return res.send(400).json({message: "Password must same with email or username"})
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