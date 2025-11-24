const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { auth } = require("../middleware/authMiddleware");

// ⬅️ IMPORT Booking model
const Booking = require("../models/bookingModels");

// Routes
router.post("/", auth, bookingController.createBooking);
router.get("/", bookingController.getBookings);
router.patch("/:id/status", bookingController.updateStatus);
router.get("/my-orders", auth, bookingController.getMyOrders);

router.get("/time-count", async (req, res) => {
  try {
    const bookings = await Booking.find({
      status: { $in: ["In Progress"] }   
    });

    const counts = {};

    bookings.forEach((b) => {
      if (!counts[b.bookingTime]) counts[b.bookingTime] = 0;
      counts[b.bookingTime]++;
    });

    res.json(counts);
  } catch (err) {
    res.status(500).json({ message: "Error calculating time count" });
  }
});



module.exports = router;
