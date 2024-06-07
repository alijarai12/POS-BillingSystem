
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
// const Role = require('./Role');

// const SuperAdmin = sequelize.define('SuperAdmin', {
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     roleId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'Role',
//             key: 'id'
//         }
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {
//     timestamps: true,
// });


// SuperAdmin.belongsTo(Role, { foreignKey: 'roleId' });
// Role.hasMany(SuperAdmin, { foreignKey: 'roleId' });

// module.exports = SuperAdmin;
