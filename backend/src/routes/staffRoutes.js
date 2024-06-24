// routes/userRoutes.js

const express = require('express');
const { getAllStaff, getStaff, updateStaffDetail, deleteStaff } = require('../controllers/staffController');
const authenticateToken = require('../middleware/auth.js');

const checkPermission = require('../middleware/grantPermission');
const router = express.Router();


// Get all staff
router.get('/', authenticateToken, checkPermission('Manage Staff'),  getAllStaff);

// Update staff detail
router.put('/:staffId', authenticateToken, checkPermission('Manage Staff'), updateStaffDetail);

router.get('/:staffId', authenticateToken, getStaff);

router.delete('/:staffId', authenticateToken, checkPermission('Manage Staff'), deleteStaff);

module.exports = router;