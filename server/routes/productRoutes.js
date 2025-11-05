const { Router } = require("express");
const { getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");

const router = Router();

// Get all products
router.get("/", getProduct);

// Create a new product
router.post("/", createProduct);

// // get haircut
// router.post("/", getHaircut);

// Update product by ID
router.put("/:id", updateProduct);

// delete product
router.delete("/:id", deleteProduct);

module.exports = router;
