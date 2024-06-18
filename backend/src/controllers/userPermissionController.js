// controllers/userPermissionsController.js

const { assignPermissionToUser } = require('../services/userPermissionService');
const { User, Permission, UserPermission } = require('../models');
const { validationResult } = require('express-validator');

const assignPermission = async (req, res) => {
    // Validate input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { userId, permissionIds } = req.body;

    try {
        const requestingUser = req.user; // Access user information from req.user
        console.log('requestingUser:', requestingUser);
        
        if (!requestingUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (requestingUser.username !== 'superadmin') {
            const seletedUser = await User.findByPk(userId);
            if(!seletedUser || seletedUser.tenant_id !== requestingUser.tenant_id) {
                return res.status(403).json({ success: false, message: 'Permission denied' });
            }
        }

        // Assign permissions to user
        const result = await assignPermissionToUser(userId, permissionIds);

        // Respond based on the result
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        // Handle errors
        res.status(400).json({ success: false, message: error.message });
    }
};

const listAllAssignedPermissions = async (req, res) => {
    try {
        // Retrieve user information from the decoded token attached to the request object by the authentication middleware
        const user = req.user;
        console.log('User:', user);

        // Fetch permissions related to the user's tenant_id
        const userPermissions = await UserPermission.findAll({
            include: [
                {
                    model: User,
                    where: { tenant_id: user.tenant_id }
                },
                { model: Permission }
            ]
        });

        console.log('User Permissions:', userPermissions);

        // Return the fetched user permissions
        res.status(200).json(userPermissions);
        
    } catch (error) {
        console.error("Error fetching user permissions:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



// Get a user permission by ID
const getUserPermissionById = async (req, res) => {
    const id = parseInt(req.params.id);
    const userPermission = await UserPermission.findByPk(id);
    if (!userPermission) {
        return res.status(404).json({ success: false, message: 'User permission not found' });
    }
    res.status(200).json(userPermission);
};

// Update a user permission
const updateUserPermission = async (req, res) => {
    const { userPermissionId } = req.params;
    const { user_id, permission_id } = req.body;
    try {
        const userPermission = await UserPermission.findByPk(userPermissionId);
        if (!userPermission) {
            return res.status(404).json({ success: false, message: 'User permission not found' });
        }
        userPermission.user_id = user_id;
        userPermission.permission_id = permission_id;
        await userPermission.save();
        res.status(200).json({ success: true, message: 'User permission updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Delete a user permission
const deleteUserPermission = async (req, res) => {
    const { userPermissionId } = req.params;
    try {
        const userPermission = await UserPermission.findByPk(userPermissionId);
        if (!userPermission) {
            return res.status(404).json({ success: false, message: 'User permission not found' });
        }
        await userPermission.destroy();
        res.status(200).json({ success: true, message: 'User permission deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { assignPermission, listAllAssignedPermissions, getUserPermissionById, updateUserPermission, deleteUserPermission };
