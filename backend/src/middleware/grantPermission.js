// middleware/grantPermission.js

const { or } = require('sequelize');
const { User, Role, Permission, UserPermission } = require('../models');


const checkPermission = (permissionName) => {
    return async (req, res, next) => {
        try {
            const user = req.user;

            // Check if the user is a superadmin
            if (user.username === 'superadmin') {
                return next(); // Allow superadmin to proceed without permission check
            }
            
            // Fetch user's role
            const fetchedUser = await User.findByPk(user.userId, { include: [{ model: Role }] });
            if (!fetchedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

             const userRole = fetchedUser.Role ? fetchedUser.Role.role_name : null;

            // Check if the user has the role name "store"
            if (userRole === 'store') {
                return next(); // Allow store to proceed without permission check
            }
            

            // Fetch user permissions
            const userPermissions = await UserPermission.findAll({
                where: { user_id: user.userId },
                include: [
                    {
                        model: Permission,
                        attributes: ['permission_name'],
                    },
                ],
            });

            const permissions = userPermissions.map(up => up.Permission.permission_name);

            // Check if the user has the required permission
            if (!permissions.includes(permissionName)) {
                return res.status(403).json({ message: 'Forbidden: You do not have the necessary permissions' });
            }

            // Attach permissions to the request object for later use
            req.user.permissions = permissions;
            next();
        } catch (error) {
            console.error('Error in checkPermission middleware:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
};

module.exports = checkPermission;
