const Product = require("../models/productModel");



// get all
const getProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    return next(err);
  }
};

// create product from multer
const createProduct = async (req, res, next) => {
  try {
    // string
    const { name, price, desc, stock, productNumbers } = req.body;

    if (!name || !price || !desc) {
      return res.status(400).json({ message: "name, price and desc are required" });
    }

    // parse/convert values safely
    const safePrice = Number(price);
    if (Number.isNaN(safePrice)) {
      return res.status(400).json({ message: "price must be a number" });
    }

    // stock optional only convert if provided and not empty
    let safeStock;
    if (stock !== undefined && stock !== "") {
      safeStock = Number(stock);
      if (Number.isNaN(safeStock)) {
        return res.status(400).json({ message: "stock must be a number" });
      }
    } // else leave undefined model default will apply

    // images: multer stores files in req.files 
    const images = Array.isArray(req.files) ? req.files.map((f) => f.filename) : [];

    // productNumbers mungkin engga berbentuk string
    let parsedProductNumbers = [];
    if (productNumbers) {
      try {
        // kalo udah bentuknya json string
        parsedProductNumbers = typeof productNumbers === "string"
          ? JSON.parse(productNumbers)
          : productNumbers;
        // Normalize to array of number: unavaible array
        parsedProductNumbers = parsedProductNumbers
          .map((pn) => {
            if (typeof pn === "object" && pn !== null && pn.number !== undefined) {
              return { number: Number(pn.number), unavailableDates: pn.unavailableDates || [] };
            }
            return null;
          })
          .filter(Boolean);
      } catch (err) {
        // fallback try num kalo ada koma nya 1,2,3
        parsedProductNumbers = productNumbers
          .split(",")
          .map((v) => parseInt(v.trim(), 10))
          .filter((n) => !Number.isNaN(n))
          .map((n) => ({ number: n, unavailableDates: [] }));
      }
    }

    const productData = {
      name: name.trim(),
      price: safePrice,
      desc: desc.trim(),
      img: images,
    };

    if (safeStock !== undefined) productData.stock = safeStock;
    if (parsedProductNumbers.length) productData.productNumbers = parsedProductNumbers;

    const product = await Product.create(productData);

    return res.status(201).json({ message: "Product created!", product });
  } catch (err) {
    return next(err);
  }
};

// update product
const updateProduct = async (req, res, next) => {
  try {
    const updateData = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.price) {
      const p = Number(req.body.price);
      if (Number.isNaN(p)) return res.status(400).json({ message: "price must be number" });
      updateData.price = p;
    }
    if (req.body.desc) updateData.desc = req.body.desc;
    if (req.body.stock !== undefined && req.body.stock !== "") {
      const s = Number(req.body.stock);
      if (Number.isNaN(s)) return res.status(400).json({ message: "stock must be number" });
      updateData.stock = s;
    }

    if (req.files && req.files.length > 0) {
      updateData.img = req.files.map((f) => f.filename);
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
    return res.status(200).json(updated);
  } catch (err) {
    return next(err);
  }
};

// delete product
const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
