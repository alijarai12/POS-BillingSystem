const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Permission = require('./Permission');


const UserPermission = sequelize.define('UserPermission', {
    user_permission_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'user_id'      
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
UserPermission.belongsTo(User, { foreignKey: 'user_id' });
UserPermission.belongsTo(Permission, { foreignKey: 'permission_id' });


  module.exports = UserPermission;
