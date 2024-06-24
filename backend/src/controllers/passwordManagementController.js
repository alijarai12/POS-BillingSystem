// controllers/PasswordManagementController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { User } = require('../models'); // Adjust path as per your project structure

const sendResetPasswordEmail = async (email) => {
  try {
    // Check if the user with this email exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    // Generate reset token with expiry
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Save token in database
    user.reset_password_token = token;
    user.reset_password_expires = Date.now() + 3600000; // 1 hour
    await user.save();
    
    // Construct reset password URL
    // const resetPasswordUrl = `${process.env.HOST}/auth/password/reset-password/${token}`;
    const resetPasswordUrl = `${process.env.FRONTEND_HOST}/reset-password/${token}`;

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request - POS Billing System',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
        + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
        + `${resetPasswordUrl}\n\n`
        + `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Password reset instructions sent to your email' };
  } catch (error) {
    console.error('Detailed Error:', error);
    throw new Error('Failed to send reset password email');
  }
};

const resetPassword = async (token, newPassword) => {
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      console.error('User not found for token:', token);
      throw new Error('Invalid token');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear reset token fields
    user.password = hashedPassword;
    user.reset_password_token = null;
    user.reset_password_expires = null;
    await user.save();

    console.log('Password updated successfully for user:', user.id);
    return { success: true, message: 'Password updated successfully' };

  } catch (error) {
    console.error('Failed to reset password:', error.message);
    throw new Error('Failed to reset password');
  }
};


module.exports = { sendResetPasswordEmail, resetPassword };
