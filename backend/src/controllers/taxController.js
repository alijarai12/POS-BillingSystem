const Tax = require('../models/Tax');
const Product = require('../models/Product');
const Variant = require('../models/Variant');

// Get all taxes
const getAllTaxes = async (req, res) => {
  try {
    const taxes = await Tax.findAll({
      include: [
        { model: Product, as: 'product' },
        { model: Variant, as: 'variant' },
      ],
    });
    res.json(taxes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new tax
const createTax = async (req, res) => {
  try {
    const { name, type, rate, description, productId, variantId } = req.body;

    const newTax = await Tax.create({
      name,
      type,
      rate,
      description,
      productId,
      variantId,
    });

    res.status(201).json(newTax);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: 'Validation error', validationErrors });
    } else {
      console.error('Error creating tax:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
// Get a single tax
const getTax = async (req, res) => {
  try {
    const taxId = req.params.id;
    const tax = await Tax.findByPk(taxId, {
      include: [
        { model: Product, as: 'product' },
        { model: Variant, as: 'variant' },
      ],
    });
    if (!tax) {
      return res.status(404).json({ error: 'Tax not found' });
    }
    res.json(tax);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an existing tax
const updateTax = async (req, res) => {
  try {
    const taxId = req.params.id;
    const updatedTax = await Tax.findByPk(taxId);
    if (!updatedTax) {
      return res.status(404).json({ error: 'Tax not found' });
    }
    await updatedTax.update(req.body);
    res.json(updatedTax);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a tax
const deleteTax = async (req, res) => {
  try {
    const taxId = req.params.id;
    const deletedTax = await Tax.findByPk(taxId);
    if (!deletedTax) {
      return res.status(404).json({ error: 'Tax not found' });
    }
    await deletedTax.destroy();
    res.json({ message: 'Tax deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = {
  getAllTaxes,
  createTax,
  getTax,
  updateTax,
  deleteTax,
};
