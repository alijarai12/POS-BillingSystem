const express = require('express');
const router = express.Router();
const { createRolePermission, getAllRolePermissions, getRolePermissionById, deleteRolePermissionById } = require('../controllers/rolePermissionController');
const authenticateToken = require('../middleware/auth.js');
const checkPermission = require('../middleware/checkPermission');


// Create a new Role-Permission association
router.post('/', authenticateToken, checkPermission('ManagePermissions'),  createRolePermission);

// Get all Role-Permission associations
router.get('/', authenticateToken, checkPermission('ManagePermissions'),  getAllRolePermissions);

// Get a Role-Permission association by ID
router.get('/:id', getRolePermissionById);

// Delete a Role-Permission association by ID
router.delete('/:id', deleteRolePermissionById);

module.exports = router;