
const express = require('express');
const variantController = require('../controllers/variantController');
const authenticateToken = require('../middleware/auth.js');
const checkPermission = require('../middleware/grantPermission');


const router = express.Router();

// Routes for managing variants
router.post('/products/:productId/variants', authenticateToken, checkPermission("Manage Product"), variantController.createVariant); // POST request to add a variant to a specific product
router.get('/variants', authenticateToken, checkPermission("Manage Product"), variantController.getAllVariants); // GET request to retrieve all variants
router.get('/variants/:id', authenticateToken, checkPermission("Manage Product"), variantController.getVariantById); // GET request to retrieve a variant by ID
router.put('/variants/:id', authenticateToken, checkPermission("Manage Product"), variantController.updateVariantById); // PUT request to update a variant by ID
router.delete('/variants/:id', authenticateToken, checkPermission("Manage Product"), variantController.deleteVariant); // DELETE request to delete a variant by ID

module.exports = router;
