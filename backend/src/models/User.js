const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./Role');
const Tenant = require('./Tenant');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // validate: {
        //     isEmail: true
        // }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'role_id'
        },
        allowNull: true
    },
    tenant_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Tenant,
            key: 'tenant_id'
        },
        allowNull: true // Nullable for SuperAdmin
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    paranoid: true // Adds deletedAt field for soft deletes
});


// // Define associations
// User.belongsTo(Role, { foreignKey: 'role_id' });
// User.belongsTo(Tenant, { foreignKey: 'tenant_id' });

module.exports = User;

