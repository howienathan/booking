const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes"); 
const { errorHandler } = require("./middleware/errorMiddleware");
const bookingRoutes = require("./routes/bookingRoutes");

const port = process.env.PORT || 5000;

// connection to database
connectDB();

//setup middleware
app.use(express.json());

// setup router
app.use("/api/product" , productRoutes)
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler)

app.listen(port,  () => console.log(`listening on on port ${port}`));