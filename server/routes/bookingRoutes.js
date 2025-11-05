const { Router } = require("express");
const { getBookings, createBooking, updateBooking, deleteBooking } = require("../controllers/bookingController");

const router = Router(); // pakai const, jangan global

router.get("/", getBookings);     // ambil daftar booking
router.post("/", createBooking);  // buat booking baru
router.put("/:id", updateBooking);  // update booking
router.delete("/:id", deleteBooking);  // DEL booking

module.exports = router;
