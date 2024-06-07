const Permission = require('../models/Permission');


// Create a Permission
const createPermission = async (req, res) => {
    try {
        const { permission_name, permission_description } = req.body;
        const permission = await Permission.create({ permission_name, permission_description });
        res.status(201).json({ message: 'Permission created successfully', permission });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Permissions
const getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.findAll();
        res.status(200).json({ permissions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Permission by ID
const getPermissionById = async (req, res) => {
    try {
        const permissionId = req.params.id;
        const permission = await Permission.findByPk(permissionId);
        if (!permission) {
            res.status(404).json({ message: 'Permission not found' });
            return;
        }
        res.status(200).json({ permission });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Permission by ID
const updatePermissionById = async (req, res) => {
    try {
        const permissionId = req.params.id;
        const { permission_name, permission_description } = req.body;
        const permission = await Permission.findByPk(permissionId);
        if (!permission) {
            res.status(404).json({ message: 'Permission not found' });
            return;
        }
        await permission.update({ permission_name, permission_description });
        res.status(200).json({ message: 'Permission updated successfully', permission });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Permission by ID
const deletePermissionById = async (req, res) => {
    try {
        const permissionId = req.params.id;
        const permission = await Permission.findByPk(permissionId);
        if (!permission) {
            res.status(404).json({ message: 'Permission not found' });
            return;
        }
        await permission.destroy();
        res.status(200).json({ message: 'Permission deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { createPermission, getAllPermissions, getPermissionById, updatePermissionById, deletePermissionById };