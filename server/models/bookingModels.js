const { type } = require("@testing-library/user-event/dist/cjs/utility/type.js");
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId,  ref: "User", required: true },
  userName: { type: String, required: true },
  productName: { type: String, required: true },
  qty: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "In progress" },
  bookingTime: { type: String},
});

module.exports = mongoose.model("Booking", bookingSchema);
