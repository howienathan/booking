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

module.exports = router;