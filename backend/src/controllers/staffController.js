const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');  // Adjust the path as necessary


// Get all staff as per the tenant
const getAllStaff = async (req, res) => {
    try {
        // Assume you have middleware that sets req.user to the authenticated user's details
        const tenantId = req.user.tenant_id;

        if (!tenantId) {
            return res.status(400).json({ error: 'Tenant ID not found in user token' });
        }

        // Fetch all users where tenant_id matches the logged-in user's tenant ID
        const staff = await User.findAll({
            where: { tenant_id: tenantId }
        });

        res.status(200).json({ staff });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { getAllStaff };