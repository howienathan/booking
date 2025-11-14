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
const app = express();
const port = process.env.PORT || 5000;

// 🔗 Connect to MongoDB
connectDB();

// 🔧 Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Izinkan akses dari React frontend
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true, 
  })
);

// 🖼️ Static folder untuk akses gambar upload
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🧩 Routes
app.use("/api/products", productRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

// 🧠 Tes auth route (cek token)
app.get("/auth", auth, (req, res) => {
  res.json({
    token: req.cookies.jwt,
    user: req.user,
  });
});

// 🛠️ Error handler (paling akhir)
app.use(errorHandler);

// 🚀 Jalankan server
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
