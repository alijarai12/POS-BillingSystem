// validators/user_validator.js

const { check } = require('express-validator');

const validateRegister = [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('role_id').notEmpty().withMessage('Role is required'),
];

const validateLogin = [
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('password').notEmpty().withMessage('Password is required'),
];




const validateProfileUpdate = [
    check('username').optional().notEmpty().withMessage('Username is required'),
    check('email').optional().isEmail().withMessage('Please enter a valid email'),
    check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];


module.exports = {
    validateRegister,
    validateLogin,
    validateProfileUpdate,

};