const { Router } = require("express");
const { auth } = require("../middleware/authMiddleware")
const { getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");

const router = Router();

// Get all products
router.get("/", getProduct);

// Create a new product
router.post("/",auth, createProduct);

// // get haircut
// router.post("/", getHaircut);

// Update product by ID
router.put("/:id",auth, updateProduct);

// delete product
router.delete("/:id",auth, deleteProduct);

module.exports = router;
