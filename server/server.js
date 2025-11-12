const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/authMiddleware");
const path = require("path");

const port = process.env.PORT || 5000;

// connect DB
connectDB();

// middleware
app.use(cookieParser());
app.use(express.json());

// static folder buat gambar upload
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/product", productRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/auth", auth, (req, res) => {
  res.json({ token: req.cookies.jwt, user: req.user });
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
