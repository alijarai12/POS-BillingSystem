// route.js

const express = require('express');
const { createRole, getAllRoles, getRoleById, updateRoleById, deleteRoleById } = require('../controllers/roleController');
const authenticateToken = require('../middleware/auth.js');
const checkPermission = require('../middleware/grantPermission');
const { validateRole } = require('../middleware/all_validator');
const router = express.Router();


// viewRoles routes
router.post('/', authenticateToken, validateRole, checkPermission('Manage Roles'), createRole);
router.get('/', authenticateToken, getAllRoles);


// Get/update role by ID
router.get('/:id', authenticateToken, getRoleById);
router.put('/:id', authenticateToken, updateRoleById);

// Delete role by ID
router.delete('/:id', authenticateToken, deleteRoleById);



// When you define a route like /roles/:id, the colon (:) indicates that id is a route parameter. This syntax is used to capture dynamic values from the URL and make them accessible in the request object's params property.
// the colon (:) is mandatory when defining route parameters in Express.


module.exports = router;
