
// // const { Sequelize } = require('sequelize');

// // const createTenantDatabase = async (tenantId, name) => {
// //   const databaseName = `tenant_${tenantId}_${name.toLowerCase().replace(/\s+/g, '_')}`;

// //   try {
// //     const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
// //       host: process.env.PGHOST,
// //       port: process.env.PGPORT,
// //       dialect: 'postgres',
// //       logging: false,
// //     });

// //     // Create the tenant database
// //     await sequelize.query(`CREATE DATABASE "${databaseName}"`);

// //     // Close the connection
// //     await sequelize.close();

// //     // Return the Sequelize instance for the new tenant database
// //     return new Sequelize(databaseName, process.env.PGUSER, process.env.PGPASSWORD, {
// //       host: process.env.PGHOST,
// //       port: process.env.PGPORT,
// //       dialect: 'postgres',
// //       logging: false,
// //     });
// //   } catch (error) {
// //     console.error('Error creating tenant database:', error);
// //     throw error;
// //   }
// // };

// // module.exports = createTenantDatabase;

// const { Sequelize } = require('sequelize');
// const defineProductModel = require('../models/Product');
// const defineVariantModel = require('../models/Variant');

// const createTenantDatabase = async (tenantId, name) => {
//   const databaseName = `tenant_${tenantId}_${name.toLowerCase().replace(/\s+/g, '_')}`;

//   try {
//     const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
//       host: process.env.PGHOST,
//       port: process.env.PGPORT,
//       dialect: 'postgres',
//       logging: false,
//     });

//     // Create the tenant database
//     await sequelize.query(`CREATE DATABASE "${databaseName}"`);

//     // Close the connection
//     await sequelize.close();

//     // Connect to the newly created tenant database
//     const tenantSequelize = new Sequelize(databaseName, process.env.PGUSER, process.env.PGPASSWORD, {
//       host: process.env.PGHOST,
//       port: process.env.PGPORT,
//       dialect: 'postgres',
//       logging: false,
//     });

//     // Define models for the tenant database
//     const Product = defineProductModel(tenantSequelize);
//     const Variant = defineVariantModel(tenantSequelize, Product);

//     // Sync models with the tenant database
//     await tenantSequelize.sync();

//     return tenantSequelize;
//   } catch (error) {
//     console.error('Error creating tenant database:', error);
//     throw error;
//   }
// };

// module.exports = createTenantDatabase;
