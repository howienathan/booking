const Product = require("../models/productModel");

// ✅ GET ALL PRODUCTS
const getProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// ✅ CREATE PRODUCT (sudah ada)
const createProduct = async (req, res, next) => {
  try {
    const { name, price, desc } = req.body;
    
    console.log("📸 FILES:", req.files);
    
    const images = req.files ? req.files.map(file => file.filename) : [];
    
    console.log("💾 SAVING IMAGES:", images);

    const product = await Product.create({
      name,
      price: Number(price),
      desc,
      img: images
    });

    res.status(201).json({
      message: "Product created!",
      product
    });
  } catch (error) {
    next(error);
  }
};

//  UPDATE PRODUCT
const updateProduct = async (req, res, next) => {
  try {
    let updateData = {
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
    };

    // up img kalo ada file yg bary
    if (req.files && req.files.length > 0) {
      updateData.img = req.files.map(file => file.filename);
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};


// ✅ DELETE PRODUCT  
const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};

// ✅ EXPORT SEMUA FUNCTION
module.exports = {
  getProduct,
  createProduct, 
  updateProduct,
  deleteProduct
};