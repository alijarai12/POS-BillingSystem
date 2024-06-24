const sequelize = require('../config/db');
const User = require('./User');
const Role = require('./Role');
const Tenant = require('./Tenant');
const Permission = require('./Permission');

const UserPermission = require('./userPermission');

// Define associations
User.belongsTo(Role, { foreignKey: 'role_id' });

User.hasMany(Tenant, { foreignKey: 'owner_id' });
Tenant.belongsTo(User, { foreignKey: 'owner_id' });


UserPermission.belongsTo(User, { foreignKey: 'user_id' });
UserPermission.belongsTo(Permission, { foreignKey: 'permission_id' });

User.belongsToMany(Permission, { through: UserPermission, foreignKey: 'user_id' });
Permission.belongsToMany(User, { through: UserPermission, foreignKey: 'permission_id' });


module.exports = {
  sequelize,
  User,
  Role,
  Tenant,
  Permission,
  UserPermission
};
