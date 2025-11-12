const Product = require("../models/productModel");

// get all prod
const getProduct = async (req, res, next) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// create new prod
const createProduct = async (req, res, next) => {
  try {
    const { name, price, desc, productNumbers } = req.body;

    // convert productNumbers ke array angka
    let parsedNumbers = [];
    if (typeof productNumbers === "string") {
      parsedNumbers = productNumbers.split(",").map((num) => ({
        number: parseInt(num.trim()),
        unavaibleDates: [],
      }));
    } else if (Array.isArray(productNumbers)) {
      parsedNumbers = productNumbers.map((num) => ({
        number: Number(num),
        unavaibleDates: [],
      }));
    }

    // ambil path gambar dari req.files
    const imagePaths = req.files ? req.files.map((file) => file.path) : [];

    const newProduct = await Product.create({
      name,
      price,
      desc,
      img: imagePaths,
      productNumbers: parsedNumbers,
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// update
const updateProduct = async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// delete
const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted", id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
