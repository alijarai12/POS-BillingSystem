const Role = require('../models/Role'); // Adjust the path as necessary

const seedRoles = async () => {
    await Role.bulkCreate([
        { name: 'SuperAdmin' },
        { name: 'TenantAdmin' },
        { name: 'TenantStaff' }
    ], { ignoreDuplicates: true });
};

module.exports = seedRoles;
