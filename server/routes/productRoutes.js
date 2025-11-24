const { Router } = require("express");
const { auth } = require("../middleware/authMiddleware")
const { 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require("../controllers/productController"); 
const uploadMiddleware = require("../middleware/uploadMiddleware");

const router = Router();


router.get("/", getProduct);
router.post("/", auth, uploadMiddleware.array("images"), createProduct);
router.put("/:id", auth, uploadMiddleware.array("images"), updateProduct);
router.delete("/:id", auth, deleteProduct);

// updated product
router.patch("/:id/stock", auth, async (req, res) => {
  try {
    const { stockChange } = req.body; // bisa positif atau negatif
    if (typeof stockChange !== "number") {
      return res.status(400).json({ message: "stockChange must be a number" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // kalo stock undefined, set default 0
    if (product.stock === undefined) product.stock = 0;

    // update stock
    product.stock += stockChange;

    // jangan sampai stock negatif
    if (product.stock < 0) product.stock = 0;

    await product.save();

    res.json({ message: "Stock updated", stock: product.stock, product });
  } catch (err) {
    console.error("Error updating stock:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;