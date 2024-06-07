// routes/userRoutes.js

const express = require('express');
const { getAllStaff } = require('../controllers/staffController');
const authenticateToken = require('../middleware/auth.js');

const checkPermission = require('../middleware/grantPermission');
const router = express.Router();


// Get all staff
router.get('/', authenticateToken, checkPermission('ManageStaff'),  getAllStaff);


module.exports = router;