const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');

// POST /discounts
router.post('/discounts', discountController.createDiscount);

// GET /discounts
router.get('/discounts', discountController.getAllDiscounts);

// GET /discounts/:id
router.get('/discounts/:id', discountController.getDiscountById);

// PUT /discounts/:id
router.put('/discounts/:id', discountController.updateDiscount);

// DELETE /discounts/:id
router.delete('/discounts/:id', discountController.deleteDiscount);

module.exports = router;
