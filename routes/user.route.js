const express = require("express");
const userRouter = express.Router();
const {
  loginUser,
  signupUser,
  userProfile,
  getUsers,
} = require("../controllers/userController");

userRouter.get("/", getUsers);
userRouter.post("/login", loginUser);
userRouter.post("/signup", signupUser);

userRouter.get("/userprofile", userProfile);

module.exports = userRouter;
