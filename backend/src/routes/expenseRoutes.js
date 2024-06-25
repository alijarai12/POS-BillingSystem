// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// GET all expenses
router.get('/expenses', expenseController.getAllExpenses);

// POST a new expense
router.post('/expenses', expenseController.createExpense);

module.exports = router;
