const User = require("../model/User");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const validator = require("validator");

const saltRounds = 10;

const signupUser = async (req, res) => {
  const {email, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await User.create({email, password: hashedPassword});
  const token = jwt.sign({user}, process.env.SECRET, {expiresIn: "1d"});

  res.status(200).json({email, token});
};
const loginUser = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user) {
    res.status(400).json("incorrect email");
  }
  const isPasswordCorrect = user.comparePassword(password);
  if (!isPasswordCorrect) {
    res.status(400).json("incorrect password");
  }
  const token = jwt.sign({user}, process.env.SECRET, {expiresIn: "1d"});
  res.status(200).json({email, token});
};

const getUsers = async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1});
  res.status(200).json(users);
};
const userProfile = async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No users found"});
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({error: "No users found"});
  }
  res.status(200).json(user);
};

module.exports = {
  loginUser,
  signupUser,
  userProfile,
  getUsers,
};
