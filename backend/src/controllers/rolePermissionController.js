const Role_Permission = require('../models/Role_Permission');


// Create a Role-Permission association
const createRolePermission = async (req, res) => {
    try {
        const { role_id, permission_id } = req.body;
        const rolePermission = await Role_Permission.create({ role_id, permission_id });
        res.status(201).json({ message: 'Role-Permission association created successfully', rolePermission });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Role-Permission associations
const getAllRolePermissions = async (req, res) => {
    try {
        const rolePermissions = await Role_Permission.findAll();
        res.status(200).json({ rolePermissions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Role-Permission association by ID
const getRolePermissionById = async (req, res) => {
    try {
        const rolePermissionId = req.params.id;
        const rolePermission = await Role_Permission.findByPk(rolePermissionId);
        if (!rolePermission) {
            res.status(404).json({ message: 'Role-Permission association not found' });
            return;
        }
        res.status(200).json({ rolePermission });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Role-Permission association by ID
const deleteRolePermissionById = async (req, res) => {
    try {
        const rolePermissionId = req.params.id;
        const rolePermission = await Role_Permission.findByPk(rolePermissionId);
        if (!rolePermission) {
            res.status(404).json({ message: 'Role-Permission association not found' });
            return;
        }
        await rolePermission.destroy();
        res.status(200).json({ message: 'Role-Permission association deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createRolePermission,
    getAllRolePermissions,
    getRolePermissionById,
    deleteRolePermissionById
}