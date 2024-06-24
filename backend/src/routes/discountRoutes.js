// File: routes/discountRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken=require('../middleware/auth.js');
const checkPermission=require('../middleware/grantPermission');

const {
  createDiscount,
  getAllDiscounts,
  updateDiscount,
  deleteDiscount,
} = require('../controllers/discountController');


// Create a new discount
router.post('/discounts', authenticateToken, checkPermission("Manage discount"), createDiscount);

// Get all discounts with associated products and variants
router.get('/discounts', authenticateToken, checkPermission("Manage discount"), getAllDiscounts);

// Update an existing discount
router.put('/discounts/:discountId', authenticateToken, checkPermission("Manage discount"), updateDiscount);

// Delete a discount
router.delete('/discounts/:discountId', authenticateToken, checkPermission("Manage discount"), deleteDiscount);

module.exports = router;