// validators/user_validator.js

const { check } = require('express-validator');

const validateRegister = [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateLogin = [
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('password').notEmpty().withMessage('Password is required'),
];


const validateStaff = [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long')
        .notEmpty()
        .withMessage('Password is required'),
    check('role_id').notEmpty().withMessage('Role is required'),
];

const validateProfileUpdate = [
    check('username').optional().notEmpty().withMessage('Username is required'),
    check('email').optional().isEmail().withMessage('Please enter a valid email'),
    check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateRole = [
    check('role_name').notEmpty().withMessage('Role name is required'),
];

const validatePermission = [
    check('permission_name').notEmpty().withMessage('Permission name is required'),
];

const validateAssignPermission = [
    check('userId').notEmpty().withMessage('User ID is required'),
    check('permissionIds').isArray({ min: 1 }).withMessage('At least one Permission required'),
  ];

module.exports = {
    validateRegister,
    validateLogin,
    validateProfileUpdate,
    validateRole,
    validateStaff,
    validatePermission,

    validateAssignPermission

};