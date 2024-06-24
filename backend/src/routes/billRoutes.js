const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');
const authenticateToken = require('../middleware/auth.js');
const checkPermission = require('../middleware/grantPermission');



// Get all bills for the logged-in tenant
router.get(
  '/bills',
  authenticateToken,
  checkPermission("Manage Bill"),
  billController.getAllBills
);

// Create a new bill
router.post(
  '/bills',
  authenticateToken,
  checkPermission("Manage Bill"),
  billController.createBill
);

// Get a specific bill by ID
router.get(
  '/bills/:id',
  authenticateToken,
  checkPermission("Manage Bill"),
  billController.getBillById
);

// Update a specific bill
router.put(
  '/bills/:id',
  authenticateToken,
  checkPermission("Manage Bill"),
  billController.updateBill
);

// Delete a specific bill
router.delete(
  '/bills/:id',
  authenticateToken,
  checkPermission("Manage Bill"),
  billController.deleteBill
);

// Get all customers for the logged-in tenant
router.get(
  '/customers',
  authenticateToken,
  checkPermission("Manage Bill"),
  billController.getAllCustomers
);


router.get(
  '/tenant/details',
  authenticateToken,
  checkPermission("Manage Bill"),
  billController.getTenantDetailsForLoggedInUser
);

module.exports = router;