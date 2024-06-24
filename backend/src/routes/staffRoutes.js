// routes/userRoutes.js

const express = require('express');
const { getAllStaff,deleteStaff } = require('../controllers/staffController');
const authenticateToken = require('../middleware/auth.js');

const checkPermission = require('../middleware/grantPermission');
const router = express.Router();


// Get all staff
router.get('/', authenticateToken, checkPermission('Manage Staff'),  getAllStaff);
router.delete('/:staffId', authenticateToken, checkPermission('Manage Staff'), deleteStaff);


module.exports = router;