// services/userPermissionService.js

const { User, Permission, UserPermission } = require('../models'); // Adjust the path as necessary

const assignPermissionToUser = async (userId, permissionIds) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Ensure permissions exist
        const permissions = await Permission.findAll({
            where: { permission_id: permissionIds }
        });

        if (permissions.length !== permissionIds.length) {
            throw new Error('Some permissions not found');
        }

        // Create UserPermission entries
        const userPermission = permissionIds.map(permissionId => ({
            user_id: userId,
            permission_id: permissionId
        }));

        await UserPermission.bulkCreate(userPermission);

        return { success: true, message: 'Permissions assigned successfully' };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = { assignPermissionToUser };
