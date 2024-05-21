const express = require('express');
const { createUser } = require('../controllers/authController'); // Import the createUser controller

const router = express.Router();


router.post('/register', createUser);
// router.post('/login', login);

module.exports = router;