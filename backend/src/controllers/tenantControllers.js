// const { v4: uuidv4 } = require('uuid');
// const Tenant = require('../models/Tenant');
// const createTenantDatabase = require('../config/tenantDatabase');

// const createTenant = async (req, res) => {
//   const { name, email, address, phoneNumber } = req.body;
//   if (!name || !email || !address || !phoneNumber) {
//     return res.status(400).json({ error: 'Name, email, address, and phoneNumber are required' });
//   }

//   const tenantId = uuidv4();
//   const databaseName = `tenant_${tenantId}_${name.toLowerCase().replace(/\s+/g, '_')}`;

//   try {
//     // Check if the tenant already exists
//     const existingTenant = await Tenant.findOne({ where: { databaseName } });

//     if (existingTenant) {
//       return res.status(409).json({ message: 'Tenant database already exists' });
//     }

//     // Create the new tenant database and sync models
//     const tenantSequelize = await createTenantDatabase(tenantId, name);
//     if (tenantSequelize) {
//       // Create a new tenant record in the central database
//       await Tenant.create({
//         id: tenantId,
//         name,
//         databaseName,
//         email,
//         address,
//         phoneNumber,
//       });
//       res.status(201).json({ message: 'Tenant database created successfully', tenantId });
//     } else {
//       res.status(500).json({ message: 'Failed to create tenant database' });
//     }
//   } catch (error) {
//     console.error('An error occurred while creating the tenant database:', error);
//     res.status(500).json({ error: 'An error occurred while creating the tenant database' });
//   }
// };

// const getTenant = async (req, res) => {
//   const { tenantId } = req.params;

//   try {
//     // Find the tenant by tenantId
//     const tenant = await Tenant.findByPk(tenantId);

//     if (!tenant) {
//       return res.status(404).json({ message: 'Tenant not found' });
//     }

//     res.status(200).json(tenant);
//   } catch (error) {
//     console.error('An error occurred while retrieving the tenant data:', error);
//     res.status(500).json({ error: 'An error occurred while retrieving the tenant data' });
//   }
// };

// module.exports = {
//   createTenant,
//   getTenant,
// };
