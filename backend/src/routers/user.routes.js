const express = require("express");
const Router = express.Router()
const {register, login, updateUser} = require("../controller/user.controller")

Router.post("/register", register);
Router.post("/", login);
Router.post("/updateUser", updateUser);

module.exports = Router