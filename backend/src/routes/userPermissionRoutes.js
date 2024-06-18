// routes/userPermissionsRoutes.js

const express = require('express');
const router = express.Router();
const { assignPermission, listAllAssignedPermissions, getUserPermissionById, updateUserPermission, deleteUserPermission } = require('../controllers/userPermissionController');
const authenticateToken = require('../middleware/auth.js');
const { validateAssignPermission } = require('../middleware/all_validator');

router.post('/assign-permission', validateAssignPermission, authenticateToken, assignPermission);

router.get('/assigned-permissions', authenticateToken, listAllAssignedPermissions);

router.get('/:userPermissionId', authenticateToken, getUserPermissionById);

router.put('/:userPermissionId', authenticateToken, updateUserPermission);

router.delete('/:userPermissionId', authenticateToken, deleteUserPermission);

module.exports = router;
