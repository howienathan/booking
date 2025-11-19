const Booking = require("../models/bookingModels");
const Product = require("../models/productModel");

exports.createBooking = async (req, res) => {
  try {
    const { userName, productId, qty, totalPrice, time } = req.body; // <-- FIX

    // 1. Cari produk
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2. Pastikan stock valid number
    let currentStock = Number(product.stock);
    if (isNaN(currentStock)) currentStock = 0;

    // 3. Cek stok
    if (currentStock > 0) {
      if (currentStock < qty) {
        return res.status(400).json({
          message: `Insufficient stock. Available stock: ${currentStock}`,
        });
      }
    }

    // 4. Kurangi stok
    if (currentStock > 0) {
      product.stock = currentStock - qty;
      await product.save();
    }

    // 5. Simpan booking
    const booking = await Booking.create({
      userName: userName || "Guest",
      productId,
      productName: product.name,
      qty,
      totalPrice,
      bookingTime: time, 
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
    res.status(500).json({ message: err.message });
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

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
