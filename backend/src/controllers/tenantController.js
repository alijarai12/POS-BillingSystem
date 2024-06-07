const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Tenant = require('../models/Tenant');



// Get all tenant
const getAllTenants = async (req, res) => {
    try {
        const tenant = await Tenant.findAll();
        res.status(200).json({ tenant });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { getAllTenants };
