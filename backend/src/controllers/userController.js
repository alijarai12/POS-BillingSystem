// controllers/UserController.js

const { User, Role, Tenant } = require('../models');

const sequelize = require('../config/db');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const fs = require('fs');


// Register a new user
const registerUser = async (req, res) => {
    try {        
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Check if the password length is sufficient
        if (password.length < 5) {
            return res.status(400).json({ message: 'Password must be at least 5 characters long' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            username,                        
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

  
// Login a user
const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the user is active
    if (!user.is_active) {
        return res.status(401).json({ message: 'Account is inactive. Please contact support.' });
      }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
    { 
        userId: user.user_id, 
        username: user.username, 
        role_id: user.role_id, 
        tenant_id: user.tenant_id,
        permissions: user.permissions // Include user permissions here
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token, userId: user.user_id, role_id: user.role_id, username: user.username, tenant_id: user.tenant_id });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


const createTenant = async (req, res) => {
    const { address, contact, business_name, ownerUsername, ownerEmail, ownerPassword } = req.body;

    const transaction = await sequelize.transaction();

    try {
        // Validate input fields (this could also be done using middleware like express-validator)
        if (!business_name || !ownerUsername || !ownerEmail) {
            return res.status(400).json({ message: 'Business_name, Username, Email fields are required' });
        }

        // Build the condition for finding an existing user
        const condition = {
            [Op.or]: [{ email: ownerEmail }]
        };
        if (contact) {
            condition[Op.or].push({ contact: contact });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ where: condition });

        if (existingUser) {
            if (existingUser.email === ownerEmail) {
                return res.status(400).json({ message: 'User with this email already exists' });
            } else if (contact && existingUser.contact === contact) {
                return res.status(400).json({ message: 'Contact number already in use' });
            }
        }

        // Check if the password length is sufficient
        if (ownerPassword.length < 5) {
            return res.status(400).json({ message: 'Password must be at least 5 characters long' });
        }

        const role = await Role.findOne({ where: { role_name: 'store' } });
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        const role_id = role.role_id;

        // Hash the password
        const hashedPassword = await bcrypt.hash(ownerPassword, 10);

        // Create the User first
        const newUser = await User.create({
            username: ownerUsername,
            address,
            contact: contact || null, // Ensure contact is set to null if not provided
            email: ownerEmail,
            password: hashedPassword,
            role_id: role_id
        }, { transaction });

        // Create the Tenant with owner_id as the newUser's ID
        const newTenant = await Tenant.create({
            business_name,
            owner_id: newUser.user_id
        }, { transaction });

        // Update the User with the tenant_id
        await newUser.update({ tenant_id: newTenant.tenant_id }, { transaction });

        await transaction.commit();

        res.status(201).json({ message: 'Tenant and User created successfully', tenant: newTenant, user: newUser });
    } catch (error) {
        await transaction.rollback();
        console.error('Error creating Tenant and User:', error); // Log the full error for debugging
        // Handle specific error cases here
        if (error.name === 'SequelizeUniqueConstraintError') {
            // Determine which field caused the unique constraint violation
            const fields = error.errors.map(e => e.path).join(', ');
            res.status(400).json({ message: `Duplicate entry detected in fields: ${fields}` });
        } else if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ message: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ message: 'Error creating Tenant and User', error: error.message });
        }
    }
};



const createStaff = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password, role_id } = req.body;
        const tenant_id = req.user.tenant_id;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStaff = await User.create({
            email,
            password: hashedPassword,
            role_id,
            tenant_id: tenant_id // Assign the extracted tenant ID
        });

        res.status(201).json({ message: 'Staff created successfully', user: newStaff });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password, role_id, tenant_id } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role_id,
            tenant_id
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { username, email, password, role_id, tenant_id } = req.body;
        user.username = username || user.username;
        user.email = email || user.email;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        user.role_id = role_id || user.role_id;
        user.tenant_id = tenant_id || user.tenant_id;

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// View logged-in user's profile
const viewProfile = async (req, res) => {
  try {
      const userId = req.user.userId;
      const user = await User.findByPk(userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Update logged-in user's profile
const updateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.user.userId;
        const { first_name, last_name, address, contact, email, password } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        if (first_name) user.first_name = first_name;
        if (last_name) user.last_name = last_name;
        if (address) user.address = address;
        if (contact) user.contact = contact;
        if (email) user.email = email;

        // Handle password update if provided
        if (password) {
            const bcrypt = require('bcrypt');
            user.password = await bcrypt.hash(password, 10);
        }

        // Handle profile image upload if provided
        if (req.file) {
            const imagePath = req.file.path;
            const profileImageBuffer = fs.readFileSync(imagePath);
            user.profile_image = profileImageBuffer;
            // Optionally, you can delete the uploaded file after reading it into the buffer
            fs.unlinkSync(imagePath);
        }

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
  registerUser,
  loginUser,
  createTenant,
  createStaff,
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  viewProfile,
  updateProfile,

};