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
    img: {  // ✅ FIELD NAME HARUS "img"
      type: [String], // array of image filenames
      default: [],
    },
    productNumbers: [
      {
        number: { type: Number, required: true },
        unavailableDates: { type: [Date], default: [] },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);  