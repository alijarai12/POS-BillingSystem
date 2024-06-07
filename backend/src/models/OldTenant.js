// // tenantModel.js

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
// const SuperAdmin = require('./SuperAdmin');
// const Role = require('./Role');



// // Define Tenant model
// const Tenant = sequelize.define('Tenant', {
//     fullname: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     contact_info: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     roleId: {
        
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'Role',
//             key: 'id'
//         }
//     },
       
//     created_by: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'SuperAdmin',
//             key: 'id'
//         }
//     }
// }, {
//     timestamps: true,
// });


// Tenant.belongsTo(Role, { foreignKey: 'roleId' });
// Role.hasMany(Tenant, { foreignKey: 'roleId' });



// Tenant.belongsTo(SuperAdmin, { foreignKey: 'created_by' });
// SuperAdmin.hasMany(Tenant, { foreignKey: 'created_by' });



// module.exports = Tenant ;
