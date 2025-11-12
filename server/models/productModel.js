const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
    },
    img: {
      type: [String], // simpan banyak gambar
      default: [],
    },
    productNumbers: [
      {
        number: { type: Number, required: true },
        unavaibleDates: { type: [Date], default: [] },
      },
    ],
  },
  { timestamps: true } // otomatis simpan createdAt & updatedAt
);

module.exports = mongoose.model("Product", productSchema);
