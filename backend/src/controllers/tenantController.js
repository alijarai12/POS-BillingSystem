const { User, Tenant } = require('../models');

// Get all tenant
const getAllTenants = async (req, res) => {
    try {
        const tenants = await Tenant.findAll({
        include: [
            {
                model: User,
                as: 'User',
                attributes: ['user_id', 'email', 'contact', 'address', 'is_active']
            }
        ]
    });
    res.status(200).json({ tenants });
} catch (error) {
    res.status(500).json({ error: error.message });
}
};


module.exports = { getAllTenants };
