const Booking = require("../models/bookingModels");
const Product = require("../models/productModel")

exports.createBooking = async (req, res) => {
  try {
    const { productId, qty, totalPrice, bookingTime } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // VALIDASI STOCK
    const currentStock = Number(product.stock) || 0;
    if (currentStock < qty) {
      return res.status(400).json({ message: `Insufficient stock. Available: ${currentStock}` });
    }

    // KURANGI STOCK
    product.stock = currentStock - qty;
    await product.save();

    // SIMPAN BOOKING DENGAN USER ID DARI TOKEN
    const booking = await Booking.create({
      userId: req.user._id,        //  <-- PENTING
      userName: req.user.name,     //  <-- optional
      productId,
      productName: product.name,
      qty,
      totalPrice,
      bookingTime,
    });

    return res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to load bookings" });
  }
};



exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};



exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log("MENCARI ORDER UNTUK USER ID:", userId);

    const orders = await Booking.find({ userId }).sort({ createdAt: -1 });

    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: "Failed to load orders" });
  }
};

