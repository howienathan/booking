const User = require("../models/usersModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🚀 Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { password, ...rest } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      ...rest,
      password: hashedPassword,
    });

    const { password: pw, ...safeUser } = user._doc;

    return res.status(201).json(safeUser);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Account not found" });
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // generate token
    const token = generateToken(user._id);

    //  Set cookie (optional)
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    });

    const { password: pw, ...safeUser } = user._doc;

    return res.status(200).json({
      message: "Login success",
      token,
      user: safeUser, // id, email, name semua masuk sini
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", { expires: new Date(0) });
  res.json({ message: "Logged out" });
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  logoutUser,
};
