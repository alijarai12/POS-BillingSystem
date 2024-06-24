// routes/userRoutes.js

const express = require('express');
const { getAllTenants, getTenantDetails } = require('../controllers/tenantController');
const authenticateToken = require('../middleware/auth.js');

const router = express.Router();


// // Create a new user (Only users with 'CREATE_USER' permission can do this)
// router.post('/', authenticateToken, checkPermission('ManageUsers'), createUser);

// Get all tenant
router.get('/', authenticateToken,  getAllTenants);
router.get('/tenants/:tenantId', authenticateToken, getTenantDetails);

module.exports = router;
