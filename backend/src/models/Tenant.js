const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Tenant = sequelize.define('Tenant', {
    tenant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },    
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // validate: {
        //     notEmpty: true,
        //     len: [1, 100]
        // }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
       
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'User', // Name of the referenced model (User model)
            key: 'id'      // Name of the referenced key in the User model
        }
    }
}, {
    timestamps: true,
    paranoid: true
});

// Define associations if needed
// Tenant.belongsTo(User, { foreignKey: 'owner_id' });

module.exports = Tenant;
