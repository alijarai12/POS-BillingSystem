// controllers/PasswordResetTokenController.js

const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Adjust path as per your project structure

const handleResetPasswordToken = async (req, res) => {
  const { token } = req.params;
  console.log('Token:', token);

  console.log('Request Path:', req.path);
  console.log('Request Method:', req.method);

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    // Find user in database
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check token validity
    console.log('Reset token in user:', user.reset_password_token);
    console.log('Reset token in URL:', token);
    console.log('Reset token expires:', user.reset_password_expires);
    console.log('Current time:', Date.now());

    // Check token validity
    if (user.reset_password_token !== token || user.reset_password_expires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // If valid, send success response
    res.status(200).json({ success: true, message: 'Token is valid' });

  } catch (error) {
    console.error('Error handling reset password token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { handleResetPasswordToken };
