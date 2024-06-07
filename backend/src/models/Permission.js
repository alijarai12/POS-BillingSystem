const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Permission = sequelize.define('Permission', {
    permission_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    permission_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permission_description: {
        type: DataTypes.TEXT,
        allowNull: true // Optional, can be set to false if description is required
    }
  },
   
  {
    timestamps: true,
    paranoid: true // Optional, disables timestamps columns (createdAt, updatedAt)
  });


  module.exports = Permission;
