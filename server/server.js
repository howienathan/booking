const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");
const { auth } = require("./middleware/authMiddleware");

// Import routes
const productRoutes = require("./routes/productRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();

const app = express();  // ⬅️ INI HARUS DULU BARU BISA app.use()
const port = process.env.PORT || 5000;

// connect db
connectDB();

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// buat izin akses ke fe
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4000"],
    credentials: true,
  })
);

// folder statis gambar
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/products", productRoutes);
app.use("/api/bookings", bookingRoutes); // ⬅️ BARU DI SINI
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

// cek token
app.get("/auth", auth, (req, res) => {
  res.json({
    token: req.cookies.jwt,
    user: req.user,
  });
});

// error handler
app.use(errorHandler);

// run server
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
