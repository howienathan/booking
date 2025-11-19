const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const {auth} = require("../middleware/authMiddleware")

router.post("/",auth, bookingController.createBooking);
router.get("/", bookingController.getBookings);
router.patch("/:id/status", bookingController.updateStatus);
router.get("/my-orders", auth, bookingController.getMyOrders);

module.exports = router;
