const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const UserModel = require("../models/user.js");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.JWT_SEC;


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //find the user with given email
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    //check the password
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    // Assign token on successful login
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "24h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

module.exports.login = login;

const signup = async (req, res) => {
  const { email, password, name,role } = req.body;
  try {
    // check if user is already registered with email
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    // create a user in mongodb
    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: name,
      role:role
    });
    // assign jwt token
    const token = jwt.sign({ email: result.email,id:result._id }, secret, {
      expiresIn: "24h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

module.exports.signup = signup;

