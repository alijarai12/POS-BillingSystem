const express = require('express');
const billController = require('../controllers/billController');
const router = express.Router();

router.post('/bills', billController.createBill);
router.get('/bills', billController.getAllBills);
router.get('/bills/:id', billController.getBillById);
router.put('/bills/:id', billController.updateBill);
router.delete('/bills/:id', billController.deleteBill);
router.get('/customers', billController.getAllCustomers);

module.exports = router;
