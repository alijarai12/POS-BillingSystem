const express = require('express');
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/auth.js');
const checkPermission = require('../middleware/grantPermission');


const router = express.Router();

router.post('/products', authenticateToken, checkPermission('Manage Product'), productController.createProduct);
router.get('/products', authenticateToken, checkPermission('Manage Product'), productController.getAllProducts);
router.get('/products/:id', authenticateToken, checkPermission('Manage Product'), productController.getProductById);
router.put('/products/:id', authenticateToken, checkPermission('Manage Product'), productController.updateProduct);
router.delete('/products/:id', authenticateToken, checkPermission('Manage Product'), productController.deleteProduct);

module.exports = router;
