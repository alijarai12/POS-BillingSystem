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
};const getTenantDetails = async (req, res) => {
    try {
      const { tenantId } = req.params;
  
      const tenant = await Tenant.findByPk(tenantId, {
        include: [
          {
            model: User,
            attributes: ['contact', 'address', 'profile_img']
          }
        ]
      });
  
      if (!tenant) {
        return res.status(404).json({ error: 'Tenant not found' });
      }
  
      const { business_name } = tenant;
      const users = tenant.Users;
  
      // Assuming you want the contact and address of the first user
      const contact = users.length > 0 ? users[0].contact : null;
      const address = users.length > 0 ? users[0].address : null;
      const profileImg = users.length > 0 ? users[0].profile_img : null;
  
      res.status(200).json({
        business_name,
        contact,
        address,
        profile_img: profileImg
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
module.exports = { getAllTenants ,
    getTenantDetails };
