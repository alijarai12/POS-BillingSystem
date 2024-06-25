const express = require('express');
const productController = require('../controllers/productControllers');
const uploader = require("../middleware/multerMiddleware");

const router = express.Router();
router.post('/products', uploader.single("image"), productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', uploader.single("image"), productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
