const jwt = require("jsonwebtoken");
const User = require("../models/usersModels");

const auth = async (req, res, next) => {
  try {
    let token;

    //  Cek token dari Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    //  Jika tidak ada, cek dari cookie
    if (!token && req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    //  Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  Ambil user dari database (tanpa password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    //  Simpan user ke req.user untuk dipakai di controller
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({
      message: "Not authorized, token invalid",
    });
  }
};

module.exports = {auth};
