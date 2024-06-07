// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
// const Tenant = require('./Tenant');
// const Role = require('./Role');



// // Define TenantStaff model
// const TenantStaff = sequelize.define('TenantStaff', {
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
//             model: 'Tenant',
//             key: 'id'
//         }
//     }
// }, {
//     timestamps: true,
// });


// TenantStaff.belongsTo(Role, { foreignKey: 'roleId' });
// Role.hasMany(TenantStaff, { foreignKey: 'roleId' });




// TenantStaff.belongsTo(Tenant, { foreignKey: 'created_by' });
// Tenant.hasMany(TenantStaff, { foreignKey: 'created_by' });



// module.exports = TenantStaff ;
