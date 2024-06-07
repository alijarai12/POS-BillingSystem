// middleware/checkPermission.js
const Role_Permission = require('../models/Role_Permission');
const Permission = require('../models/Permission');



const checkPermission = (permissionName) => {
    return async (req, res, next) => {
        try {
            const user = req.user;
            const userRole = user.role_id;
            console.log('User-----', user);
            console.log('User Role-----', user.role_id);
            console.log('PermissionName-----', permissionName);
            // if (!user || typeof user.role_id === 'undefined') {
            //     return res.status(401).json({ messageeeeeeeee: 'Unauthorized' });
            // }

            const rolePermission = await Role_Permission.findAll({
                where: { role_id: userRole },
                include: [
                    {
                        model: Permission,
                        where: { permission_name: permissionName }
                    }
                ]
            });
            // console.log('Role Permission-----', rolePermission);

            if (rolePermission.length === 0) {
                return res.status(403).json({ message: 'Forbidden: You do not have the necessary permissions' });
            }

            next();
        } catch (error) {
            console.error('Error in checkPermission middleware:', error);

            res.status(500).json({ messagekky: error.message });
        }
    };
};

module.exports = checkPermission;
