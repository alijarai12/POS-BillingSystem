const express = require("express");

const csvController = require("../controllers/uploadController.js");
const variantController = require("../controllers/variantControllers.js");
const productController = require("../controllers/productControllers.js");
const uploadFile = require("../middleware/multerMiddleware.js");
const path = require("path");

const router = express.Router();

// CSV Routes
router.post("/csv/upload", uploadFile.single("file"), csvController.upload);
router.get("/csv/download", csvController.download);
router.get("/csv/sample", (req, res) => {
  // Path to your sample CSV file
  const sampleFilePath = path.join(__dirname, "..", "uploads", "Bulk2.csv");

  // Send the file as a response
  res.sendFile(sampleFilePath);
});
router.post(
  "/products",
  uploadFile.single("image"),
  productController.createProduct
);
router.put(
  "/products/:id",
  uploadFile.single("image"),
  productController.updateProduct
);

// Variant Routes
router.post(
  "/products/:productId/variants",
  uploadFile.single("image"),
  variantController.createVariant
);
router.put(
  "/variants/:id",
  uploadFile.single("image"),
  variantController.updateVariantById
);

module.exports = router;
