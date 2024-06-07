// middleware/grantPermission.js
const UserPermission = require('../models/userPermission');
const Permission = require('../models/Permission');



const checkPermission = (permissionName) => {
    return async (req, res, next) => {
        try {
            const user = req.user;
            // const userRole = user.role_id;
            console.log('User-----', user);
            // console.log('User Role-----', user.role_id);
            console.log('PermissionName-----', permissionName);
            // if (!user || typeof user.role_id === 'undefined') {
            //     return res.status(401).json({ messageeeeeeeee: 'Unauthorized' });
            // }

            const userPermission = await UserPermission.findAll({
                where: { user_id: user.userId },
                include: [
                    {
                        model: Permission,
                        where: { permission_name: permissionName }
                    }
                ]
            })
            console.log('User Permission-----', userPermission);
            if (userPermission.length === 0) {
                return res.status(403).json({ message: 'Forbidden: You do not have the necessary permissions' });
            }

            next();
        } catch (error) {
            console.error('Error in checkPermission middleware:', error);

            res.status(500).json({ message: error.message });
        }
    };
};

module.exports = checkPermission;
