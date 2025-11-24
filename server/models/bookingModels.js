const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  productName: { type: String, required: true },
  qty: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },

  status: {
    type: String,
    enum: ["In Progress", "Done", "Cancelled"],
    default: "In Progress"
  },

  bookingTime: { type: String, required: true }
});

module.exports = mongoose.model("Booking", bookingSchema);
