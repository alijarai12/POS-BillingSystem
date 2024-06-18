// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, createTenant, createStaff, createUser, getAllUsers, getUserById, updateUserById, deleteUserById, viewProfile, updateProfile } = require('../controllers/userController');
const { validateRegister, validateLogin, validateProfileUpdate, validateStaff } = require('../middleware/all_validator');
const authenticateToken = require('../middleware/auth');

const checkPermission = require('../middleware/grantPermission');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

module.exports = router;

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = path.join(__dirname, '..', 'uploads', 'profile');
      fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
  });
  
// Initialize multer
const upload = multer({ storage: storage });

// Update logged-in user's profile
router.put('/profile', authenticateToken, validateProfileUpdate, upload.single('profile_image'), updateProfile);


// Register a new user
router.post('/register', validateRegister, registerUser);

// Login a user
router.post('/login', validateLogin, loginUser);

// View logged-in user's profile
router.get('/profile', authenticateToken, viewProfile);

router.post('/createTenant', authenticateToken, checkPermission('Manage Users'), createTenant);

router.post('/createStaff', validateStaff, authenticateToken, checkPermission('Manage Staff'), createStaff);

// Create a new user (Only users with 'CREATE_USER' permission can do this)
router.post('/', authenticateToken, checkPermission('Manage Users'), createUser);

// Get all users
router.get('/', authenticateToken, checkPermission('Manage Users'), getAllUsers);

// Get user by ID
router.get('/:id', authenticateToken, getUserById);

// Update user by ID (Only users with 'UPDATE_USER' permission can do this)
router.put('/:id', authenticateToken, checkPermission(['Manage Users']), updateUserById);

// Delete user by ID (Only users with 'DELETE_USER' permission can do this)
router.delete('/:id', authenticateToken, checkPermission('Manage Users'), deleteUserById);

module.exports = router;
