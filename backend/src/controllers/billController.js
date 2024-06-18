const Bill = require('../models/Bill');

// Create a new bill
exports.createBill = async (req, res) => {
  try {
    const newBill = await Bill.create(req.body);
    res.status(201).json(newBill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const search = req.query.search || '';
    const bills = await Bill.findAll();

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

// Get all bills
exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.findAll();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single bill by ID
exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findByPk(req.params.id);
    if (bill) {
      res.status(200).json(bill);
    } else {
      res.status(404).json({ error: 'Bill not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a bill by ID
exports.updateBill = async (req, res) => {
  try {
    const [updated] = await Bill.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedBill = await Bill.findByPk(req.params.id);
      res.status(200).json(updatedBill);
    } else {
      res.status(404).json({ error: 'Bill not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a bill by ID
exports.deleteBill = async (req, res) => {
  try {
    const deleted = await Bill.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Bill not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
