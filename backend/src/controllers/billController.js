const Bill = require('../models/Bill');
const { User, Tenant } = require('../models');

// Helper function to get tenant ID from request
const getTenantId = (req) => {
  if (!req.user || !req.user.tenant_id) {
    throw new Error('Tenant ID not found in request');
  }
  return req.user.tenant_id;
};

// Create a new bill
exports.createBill = async (req, res) => {
  try {
    const tenantId = getTenantId(req);
    const newBill = await Bill.create({ ...req.body, tenant_id: tenantId });
    res.status(201).json(newBill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all unique customers
exports.getAllCustomers = async (req, res) => {
  try {
    const tenantId = getTenantId(req);
    const search = req.query.search || '';
    const bills = await Bill.findAll({ where: { tenant_id: tenantId } });

    const uniqueCustomers = {};

    bills.forEach((bill) => {
      if (!uniqueCustomers[bill.customerName]) {
        uniqueCustomers[bill.customerName] = {
          id: bill.id,
          name: bill.customerName,
          number: bill.customerNumber,
          address: bill.address,
          orders: [{
            date: bill.date,
            cartItems: bill.cartItems,
          }],
        };
      } else {
        uniqueCustomers[bill.customerName].orders.push({
          date: bill.date,
          cartItems: bill.cartItems,
        });
      }
    });

    const customers = Object.values(uniqueCustomers).filter(customer =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.number.includes(search)
    );

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bills for the logged-in tenant
exports.getAllBills = async (req, res) => {
  try {
    const tenantId = getTenantId(req);
    const bills = await Bill.findAll({ where: { tenant_id: tenantId } });
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single bill by ID for the logged-in tenant
exports.getBillById = async (req, res) => {
  try {
    const tenantId = getTenantId(req);
    const bill = await Bill.findOne({
      where: {
        id: req.params.id,
        tenant_id: tenantId
      }
    });
    if (bill) {
      res.status(200).json(bill);
    } else {
      res.status(404).json({ error: 'Bill not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a bill by ID for the logged-in tenant
exports.updateBill = async (req, res) => {
  try {
    const tenantId = getTenantId(req);
    const [updated] = await Bill.update(req.body, {
      where: {
        id: req.params.id,
        tenant_id: tenantId
      }
    });
    if (updated) {
      const updatedBill = await Bill.findOne({
        where: {
          id: req.params.id,
          tenant_id: tenantId
        }
      });
      res.status(200).json(updatedBill);
    } else {
      res.status(404).json({ error: 'Bill not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a bill by ID for the logged-in tenant
exports.deleteBill = async (req, res) => {
  try {
    const tenantId = getTenantId(req);
    const deleted = await Bill.destroy({
      where: {
        id: req.params.id,
        tenant_id: tenantId
      }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Bill not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tenants
exports.getTenantDetailsForLoggedInUser = async (req, res) => {
  try {
    const tenantId = req.user.tenant_id; // Assuming your auth middleware adds user info to the request
    const tenant = await Tenant.findByPk(tenantId, {
      include: [
        {
          model: User,
          attributes: ['contact', 'address']
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
   

    res.status(200).json({
      business_name,
      contact,
      address,
   
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
