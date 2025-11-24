const Booking = require("../models/bookingModels");
const Product = require("../models/productModel");


exports.createBooking = async (req, res) => {
  try {
    const { productId, qty, totalPrice, bookingTime } = req.body;

    // validate input
    if (!productId || !qty || !totalPrice || !bookingTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (qty <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0" });
    }

    // cek product
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const currentStock = Number(product.stock) || 0;

    // cek stock
    if (currentStock < qty) {
      return res.status(400).json({
        message: `Insufficient stock. Available: ${currentStock}`,
      });
    }

    // cek slot udah 3 blm
    const count = await Booking.countDocuments({ 
      bookingTime,
      status: { $in: ["In Progress"] }
     });

    if (count >= 3) {
      return res.status(400).json({
        message: `Slot ${bookingTime} sudah penuh!`,
      });
    }

    // KURANGI STOK
    product.stock = currentStock - qty;
    await product.save();

    // CREATE BOOKING
    const booking = await Booking.create({
      userId: req.user._id,
      userName: req.user.name,
      productId,
      productName: product.name,
      qty,
      totalPrice,
      bookingTime,
      status: "In Progress",
    });

    return res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// get all book (admin)
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return res.json(bookings);
  } catch (err) {
    return res.status(500).json({ message: "Failed to load bookings" });
  }
};

// update stat booking
    exports.updateStatus = async (req, res) => {
      try {
        const { status } = req.body;

        if (!status) {
          return res.status(400).json({ message: "Status is required" });
        }

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
          return res.status(404).json({ message: "Booking not found" });
        }

        // kalau CANCELLED → balikin stok selama status sebelumnya bukan cancelled
        if (status === "Cancelled" && booking.status !== "Cancelled") {
          const product = await Product.findById(booking.productId);

          if (product) {
            product.stock = Number(product.stock) + Number(booking.qty);
            await product.save();
          }
        }

        // update status booking
        booking.status = status;
        await booking.save();

        res.json({
          message: "Status updated successfully",
          booking
        });

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    };

// get order user
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Booking.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: "Failed to load orders" });
  }
};
