const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes"); 
const { errorHandler } = require("./middleware/errorHandler");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/authMiddleware");

const port = process.env.PORT || 5000;

// connection to database
connectDB();

//setup middleware
app.use(cookieParser());
app.use(express.json());


// setup router
app.use("/api/product" , productRoutes)
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.get("/auth", auth, (req, res) => {
  res.json({ token: req.cookies.jwt, user: req.user });
});

app.use(errorHandler)

app.listen(port,  () => console.log(`listening on on port ${port}`));