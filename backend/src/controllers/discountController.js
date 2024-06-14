const Discount= require('../models/Discount');
const Product = require('../models/Product');
const Variant = require('../models/Variant');

const createDiscount = async (req, res) => {
  try {
    const { name, type, value, startDate, endDate, productId, variantId } = req.body;

    // // Check if productId and variantId exist
    // if (productId && variantId) {
    //   throw new Error('Cannot create discount for both product and variant simultaneously');
    // }

    // // Check if productId or variantId is provided
    // if (!productId && !variantId) {
    //   throw new Error('Please provide either productId or variantId for the discount');
    // }

    const newDiscount = await Discount.create({
      name,
      type,
      value,
      startDate,
      endDate,
      productId,
      variantId,
    });

    res.status(201).json(newDiscount);
  } catch (error) {
    console.error('Error creating discount:', error);
    res.status(500).json({ error: error.message });
  }
};

const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.findAll({
      include: [
        { model: Product, as: 'product' },
        { model: Variant, as: 'variant' }
      ],
    });
    res.json(discounts);
  } catch (error) {
    console.error('Error fetching discounts:', error);
    res.status(500).json({ error: 'Error fetching discounts' });
  }
};

const getDiscountById = async (req, res) => {
  const discountId = req.params.id;
  try {
    const discount = await Discount.findByPk(discountId, {
      include: [
        { model: Product, as: 'product' },
        { model: Variant, as: 'variant' }
      ],
    });
    if (!discount) {
      return res.status(404).json({ error: 'Discount not found' });
    }
    res.json(discount);
  } catch (error) {
    console.error('Error fetching discount:', error);
    res.status(500).json({ error: 'Error fetching discount' });
  }
};

const updateDiscount = async (req, res) => {
  const { name, type, value, startDate, endDate, productId, variantId } = req.body;
  const discountId = req.params.id;

  try {
    const existingDiscount = await Discount.findByPk(discountId);

    if (!existingDiscount) {
      return res.status(404).json({ error: 'Discount not found' });
    }

    // Check if productId and variantId exist
    if (productId && variantId) {
      throw new Error('Cannot update discount for both product and variant simultaneously');
    }

    // Check if productId or variantId is provided
    if (!productId && !variantId) {
      throw new Error('Please provide either productId or variantId for the discount');
    }

    await existingDiscount.update({
      name,
      type,
      value,
      startDate,
      endDate,
      productId,
      variantId,
    });

    res.status(200).json({ message: 'Discount updated successfully' });
  } catch (error) {
    console.error('Error updating discount:', error);
    res.status(500).json({ error: error.message });
  }
};

const deleteDiscount = async (req, res) => {
  const discountId = req.params.id;
  try {
    const deleted = await Discount.destroy({
      where: { discountId },
    });
    if (deleted) {
      res.json({ message: 'Discount deleted successfully' });
    } else {
      res.status(404).json({ error: 'Discount not found' });
    }
  } catch (error) {
    console.error('Error deleting discount:', error);
    res.status(500).json({ error: 'Error deleting discount' });
  }
};

module.exports = {
  createDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
};
