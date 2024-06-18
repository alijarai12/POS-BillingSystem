const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Role = require('../models/Role');
const { validationResult } = require('express-validator');


// Create a new role
const createRole = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { role_name } = req.body;
        const role = await Role.create({ role_name });
        res.status(201).json({ message: 'Role created successfully', role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all roles
const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json({ roles });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get role by ID
const getRoleById = async (req, res) => {
    try {
        const id = parseInt(req.params.id); // Parse the id parameter as an integer
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json({ role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update role by ID
const updateRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const { role_name } = req.body;
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        role.role_name = role_name;
        await role.save();
        res.status(200).json({ message: 'Role updated successfully', role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete role by ID
const deleteRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        await role.destroy();
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllRoles, createRole, getRoleById, updateRoleById, deleteRoleById };
