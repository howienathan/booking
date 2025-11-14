const jwt = require("jsonwebtoken");
const User = require("../models/usersModels");

const auth = async (req, res, next) => {
  try {
    // ✅ CARI TOKEN DARI 2 SUMBER: Header dulu, baru Cookie
    let token;

    if (req.header("Authorization") && req.header("Authorization").startsWith("Bearer ")) {
      // Ambil dari Header
      token = req.header("Authorization").replace("Bearer ", "");
      console.log("🔑 Token dari Header");
    } else if (req.cookies?.jwt) {
      // Ambil dari Cookie  
      token = req.cookies.jwt;
      console.log("🍪 Token dari Cookie");
    }

    console.log("Token:", token ? "✅ Ada" : "❌ Tidak ada");

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({
      message: "Not authorized, token invalid"
    });
  }
};

module.exports = { auth };