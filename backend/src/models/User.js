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
        allowNull: true,
        unique: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    middle_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,        
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: true,   
        unique: true,    
    },   
    profile_image: {
        type: DataTypes.BLOB('long'), // <- type for image ( database :postgresql ) BLOB is a binary large object type.
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            len: [6, 255] // example length constraints
        },
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
        allowNull: true // Nullable for SuperAdmin
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


module.exports = User;