const express = require('express');
const router = express.Router();
const taxController = require('../controllers/taxController');

// GET all taxes
router.get('/taxes', taxController.getAllTaxes);

// POST create a new tax
router.post('/taxes', taxController.createTax);

// GET get a tax by ID
router.get('/taxes/:id', taxController.getTax);

// PUT update an existing tax
router.put('/taxes/:id', taxController.updateTax);

// DELETE delete a tax
router.delete('/taxes/:id', taxController.deleteTax);

module.exports = router;
