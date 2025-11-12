const jwt = require("jsonwebtoken");
const User = require("../models/usersModels");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt; // pake optional chaining biar aman

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Cari user berdasarkan ID di token
    const user = await User.findById(decoded.id).select("-password"); // hide password

    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    // Simpan user ke req supaya bisa diakses di controller
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    return res.status(401).json({
      message:
        error.name === "JsonWebTokenError"
          ? "Invalid token"
          : "Not authorized",
    });
  }
};

module.exports = { auth };
