// routes/passwordRoutes.js

const express = require('express');
const { sendResetPasswordEmail, resetPassword } = require('../controllers/passwordManagementController');
const { handleResetPasswordToken } = require('../controllers/passwordResetTokenController');
const router = express.Router();

// POST route to request password reset
router.post('/reset-password', async (req, res) => {
    try {
      const response = await sendResetPasswordEmail(req.body.email);
      res.json(response);
    } catch (error) {
      console.error('Error in reset-password route:', error.message, error.stack);
      res.status(500).json({ message: error.message });
    }
  });
  

// POST route to update password after reset
router.post('/update-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    console.log('Reset password request received with token:', token);

    const result = await resetPassword(token, newPassword);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in /update-password route:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET route to verify token and render reset password form
router.get('/reset-password/:token', handleResetPasswordToken);




module.exports = router;
