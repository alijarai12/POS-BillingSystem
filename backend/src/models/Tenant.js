const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Tenant = sequelize.define('Tenant', {
    tenant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    owner_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User, 
            key: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'  
        },
        allowNull: false,
    },
    business_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'The name of the tenant\'s business.'
    },
}, {
    timestamps: true,
    paranoid: true
});

// Define associations if needed
// Tenant.belongsTo(User, { foreignKey: 'owner_id' });

module.exports = Tenant;
