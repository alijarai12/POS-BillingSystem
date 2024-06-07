const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./Role');
const Permission = require('./Permission');


const Role_Permission = sequelize.define('Role_Permission', {
    role_permission_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Role',
        key: 'role_id'      
        }      
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Permission', 
        key: 'permission_id'      
        }    
    }
  }, {
    timestamps: true
  });
  
// Define associations if needed
Role_Permission.belongsTo(Role, { foreignKey: 'role_id' });
Role_Permission.belongsTo(Permission, { foreignKey: 'permission_id' });


module.exports = Role_Permission;
