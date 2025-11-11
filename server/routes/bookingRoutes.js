const { Router } = require("express");
const { getBookings, createBooking, updateBooking, deleteBooking } = require("../controllers/bookingController");
const { auth } = require("../middleware/authMiddleware");

const router = Router(); // pakai const, jangan global

router.get("/",auth, getBookings);     // ambil daftar booking
router.post("/",auth, createBooking);  // buat booking baru
router.put("/:id",auth, updateBooking);  // update booking
router.delete("/:id",auth, deleteBooking);  // DEL booking

module.exports = router;
