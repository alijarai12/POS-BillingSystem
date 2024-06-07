// routes/userPermissionsRoutes.js

const express = require('express');
const router = express.Router();
const { assignPermission, listAllAssignedPermissions, getUserPermissionById, updateUserPermission, deleteUserPermission } = require('../controllers/userPermissionController');
const authenticateToken = require('../middleware/auth.js');

router.post('/assign-permission', authenticateToken, assignPermission);

router.get('/assigned-permissions', authenticateToken, listAllAssignedPermissions);

router.get('/:id', authenticateToken, getUserPermissionById);

router.put('/:id', authenticateToken, updateUserPermission);

router.delete('/:id', authenticateToken, deleteUserPermission);

module.exports = router;
