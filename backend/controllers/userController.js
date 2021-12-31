const userModel = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, profilePic } = req.body;

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await userModel.create({ name, email, password, profilePic });

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong...");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials...");
  }
});

module.exports = { registerUser, authUser };
