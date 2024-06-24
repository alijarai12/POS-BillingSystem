const express = require('express');
const router = express.Router();
const taxController = require('../controllers/taxController');
const authenticateToken=require('../middleware/auth.js');
const checkPermission=require('../middleware/grantPermission');


// GET all taxes
router.get('/taxes', authenticateToken, checkPermission("Manage tax"), taxController.getAllTaxes);

// POST create a new tax
router.post('/taxes', authenticateToken, checkPermission("Manage tax"), taxController.createTax);

// GET get a tax by ID
router.get('/taxes/:id', authenticateToken, checkPermission("Manage tax"), taxController.getTax);

// PUT update an existing tax
router.put('/taxes/:id', authenticateToken, checkPermission("Manage tax"), taxController.updateTax);

// DELETE delete a tax
router.delete('/taxes/:id', authenticateToken, checkPermission("Manage tax"), taxController.deleteTax);

module.exports = router;
