// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, createTenant, createStaff, createUser, getAllUsers, getUserById, updateUserById, deleteUserById, viewProfile, updateProfile } = require('../controllers/userController');
const { validateRegister, validateLogin, validateProfileUpdate } = require('../middleware/user_validator');
const authenticateToken = require('../middleware/auth');

// const checkPermission = require('../middleware/checkPermission');
const checkPermission = require('../middleware/grantPermission');

// Register a new user
router.post('/register', validateRegister, registerUser);

// Login a user
router.post('/login', validateLogin, loginUser);

// View logged-in user's profile
router.get('/profile', authenticateToken, viewProfile);

// Update logged-in user's profile
router.put('/profile', authenticateToken, checkPermission(['UpdateProfile']), validateProfileUpdate, updateProfile);


router.post('/createTenant', authenticateToken, checkPermission('ManageUsers'), createTenant);

router.post('/createStaff', authenticateToken, checkPermission(['ManageStaff']), createStaff);


// Create a new user (Only users with 'CREATE_USER' permission can do this)
router.post('/', authenticateToken, checkPermission('ManageUsers'), createUser);

// Get all users
router.get('/', authenticateToken, checkPermission('ManageUsers'), getAllUsers);

// Get user by ID
router.get('/:id', authenticateToken, getUserById);

// Update user by ID (Only users with 'UPDATE_USER' permission can do this)
router.put('/:id', authenticateToken, checkPermission(['ManageUsers']), updateUserById);

// Delete user by ID (Only users with 'DELETE_USER' permission can do this)
router.delete('/:id', authenticateToken, checkPermission('DELETE_USER'), deleteUserById);


module.exports = router;
