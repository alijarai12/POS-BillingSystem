// controllers/userPermissionsController.js

const { assignPermissionToUser } = require('../services/userPermissionService');
const { User, Permission, UserPermission } = require('../models');

const assignPermission = async (req, res) => {
    const { userId, permissionIds } = req.body;


    try {
        // Validate input
        if (!userId || !Array.isArray(permissionIds) || permissionIds.length === 0) {

            return res.status(400).json({ success: false, message: 'Invalid input' });
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

// List of assigned permissions for a user
const listAssignedPermissions = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    const userPermissions = await UserPermission.findAll({
        where: { user_id: userId },
        include: [{ model: Permission }]
    });
    res.status(200).json(userPermissions);
};

// List of assingned permisions for all users
// const listAllAssignedPermissions = async (req, res) => {
//     const userPermissions = await UserPermission.findAll({
//         include: [{ model: User }, { model: Permission }]
//     });
//     res.status(200).json(userPermissions);
// };


const listAllAssignedPermissions = async (req, res) => {
    try {
        // Retrieve user information from the decoded token attached to the request object by the authentication middleware
        const user = req.user;
        console.log('User:', user);

        // Fetch user permissions based on the user ID obtained from the token
        let userPermissions;
        if (user.username === 'super') {
            // If the user is "super", retrieve all permissions without filtering
            userPermissions = await UserPermission.findAll({
                include: [{ model: User }, { model: Permission }]
            });
        } else {
            // For regular users, filter permissions based on the user ID
            userPermissions = await UserPermission.findAll({
                where: { user_id: user.userId }, // Assuming your UserPermission model has a user_id field
                include: [{ model: User }, { model: Permission }]
            });
        }

        console.log('User Permissions:', userPermissions);

        // Return the fetched user permissions
        res.status(200).json(userPermissions);
        
    } catch (error) {
        console.error("Error fetching user permissions:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};






const getAllUserPermissions = async (req, res) => {
    const userPermissions = await UserPermission.findAll();
    res.status(200).json(userPermissions);
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
    const { id } = req.params;
    const { user_id, permission_id } = req.body;
    try {
        const userPermission = await UserPermission.findByPk(id);
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
    const { id } = req.params;
    try {
        const userPermission = await UserPermission.findByPk(id);
        if (!userPermission) {
            return res.status(404).json({ success: false, message: 'User permission not found' });
        }
        await userPermission.destroy();
        res.status(200).json({ success: true, message: 'User permission deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { assignPermission, listAssignedPermissions, listAllAssignedPermissions, getUserPermissionById, updateUserPermission, deleteUserPermission };
