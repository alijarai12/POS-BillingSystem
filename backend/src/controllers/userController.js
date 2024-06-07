// controllers/UserController.js

const User = require('../models/User');
const Tenant = require('../models/Tenant');
const sequelize = require('../config/db');

const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');



// Register a new user
const registerUser = async (req, res) => {
    try {
      const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, email, password, role_id, tenant_id } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role_id,
            tenant_id
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
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

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate a JWT token
      const token = jwt.sign(
          { userId: user.user_id, username: user.username, role_id: user.role_id, tenant_id: user.tenant_id },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );

      res.status(200).json({ message: 'Login successful', token, userId: user.user_id, role_id: user.role_id, tenant_id: user.tenant_id });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


const createTenant = async (req, res) => {
    const { fullname, address, phone_number, ownerUsername, ownerEmail, ownerPassword, role_id } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const role_id = 9;
        // Hash the password
        const hashedPassword = await bcrypt.hash(ownerPassword, 10);

        // Create the User first
        const newUser = await User.create({
            username: ownerUsername,
            email: ownerEmail,
            password: hashedPassword,
            role_id: role_id
        }, { transaction });

        // Create the Tenant with owner_id as the newUser's ID
        const newTenant = await Tenant.create({
            fullname,
            address,
            phone_number,
            owner_id: newUser.user_id
        }, { transaction });

        // Update the User with the tenant_id
        await newUser.update({ tenant_id: newTenant.tenant_id }, { transaction });

        await transaction.commit();

        res.status(201).json({ message: 'Tenant and User created successfully', tenant: newTenant, user: newUser });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: 'Error creating Tenant and User', error: error.message });
    }
};


const createStaff = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password, role_id } = req.body;
        const tenant_id = req.user.tenant_id;
        console.log('Tenant ID:', tenant_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStaff = await User.create({
            username,
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
      const user = await User.findByPk(userId, {
          attributes: ['user_id', 'username', 'email', 'role_id', 'tenant_id']
      });

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
      const { username, email, password } = req.body;

      console.log('Received data:', { userId, username, email, password }); // Log the received data


      const user = await User.findByPk(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Update user details
      user.username = username || user.username;
      user.email = email || user.email;

      if (password) {
          const bcrypt = require('bcrypt');
          user.password = await bcrypt.hash(password, 10);
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