const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as needed


const Role = sequelize.define('Role', {
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true
});


module.exports = Role;
