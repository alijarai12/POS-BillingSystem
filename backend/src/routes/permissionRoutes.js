const express = require('express');
const { createPermission, getAllPermissions, getPermissionById, updatePermissionById, deletePermissionById } = require('../controllers/permissionController');
const authenticateToken = require('../middleware/auth.js');
const checkPermission = require('../middleware/grantPermission');
const router = express.Router();


// Create a new permission
router.post('/', authenticateToken, checkPermission('ManagePermissions'), createPermission);

// Get all permissions
router.get('/', authenticateToken, checkPermission('ManagePermissions'), getAllPermissions);

// Get a permission by ID
router.get('/:id', authenticateToken, getPermissionById);

// Update a permission by ID
router.put('/:id', authenticateToken, updatePermissionById);

// Delete a permission by ID
router.delete('/:id', deletePermissionById);

module.exports = router;
