const { User, Role } = require('../models');  // Adjust the path as necessary
const { Op } = require('sequelize');


// Get all staff as per the tenant
const getAllStaff = async (req, res) => {
    try {
        
        const tenantId = req.user.tenant_id;
        const userId = req.user.userId;  // Assuming req.user.user_id contains the logged-in user's ID

        if (!tenantId) {
            return res.status(400).json({ error: 'Only Store Owner can view all staff' });
        }

        // Fetch all users where tenant_id matches the logged-in user's tenant ID
        const staff = await User.findAll({
            where: { 
                tenant_id: tenantId,
                user_id:{
                    [Op.ne]: userId}
            }, 
            include: [{model: Role, attributes: ['role_name']}]
        });
        console.log('staff:', staff);

        res.status(200).json({ staff });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStaff = async (req, res) => {
    const { staffId } = req.params; // Extract staffId from URL parameters
    // Assuming req.user.user_id is used to find the staff by their user_id
    try {
        const staff = await User.findByPk(staffId); // Assuming User model has findByPk method
        if (!staff) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        res.status(200).json({ staff });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateStaffDetail = async (req, res) => {
    const { staffId } = req.params;
    const { status } = req.body;

    try {
        const staff = await User.findByPk(staffId);
        if (!staff) {
            return res.status(404).json({ error: 'Staff not found' });
        }

        staff.is_active = status;

        await staff.save();

        res.status(200).json({ message: 'Staff details updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteStaff = async (req, res) => {
    const { staffId } = req.params;
    try {
        const staff = await User.findByPk(staffId);
        if (!staff) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        await staff.destroy();
        res.status(200).json({ message: 'Staff deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllStaff, getStaff, updateStaffDetail, deleteStaff };