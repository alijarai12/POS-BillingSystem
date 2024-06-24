const Discount = require('../models/Discount');
const Product = require('../models/Product');
const Variant = require('../models/Variant');

// Helper function to get tenant ID from request
const getTenantId = (req) => {
  if (!req.user || !req.user.tenant_id) {
    throw new Error('Tenant ID not found in request');
  }
  return req.user.tenant_id;
};

// Create a new discount
const createDiscount = async (req, res) => {
  try {
    const tenantId = getTenantId(req);
    const { name, type, value, startDate, endDate, productIds, variantIds } = req.body;

    const discount = await Discount.create({ 
      name, 
      type, 
      value, 
      startDate, 
      endDate, 
      tenant_id: tenantId 
    });

    if (productIds && productIds.length > 0) {
      const products = await Product.findAll({ where: { id: productIds, tenant_id: tenantId } });
      await discount.addProducts(products);
    }

    if (variantIds && variantIds.length > 0) {
      const variants = await Variant.findAll({ where: { id: variantIds, tenant_id: tenantId } });
      await discount.addVariants(variants);
    }

    res.status(201).json(discount);
  } catch (error) {
    console.error('Error creating discount:', error);
    res.status(500).json({ error: 'Error creating discount' });
  }
};

// Get all discounts with associated products and variants for the tenant
const getAllDiscounts = async (req, res) => {
  try {
    const tenantId = getTenantId(req);
    const discounts = await Discount.findAll({
      where: { tenant_id: tenantId },
      include: [
        {
          model: Product,
          as: 'products',
          include: [
            {
              model: Variant,
              as: 'variants',
            },
          ],
        },
        {
          model: Variant,
          as: 'variants',
          include: [
            {
              model: Product,
              as: 'product',
            },
          ],
        },
      ],
    });

    res.json(discounts);
  } catch (error) {
    console.error('Error fetching discounts:', error);
    res.status(500).json({ error: 'Error fetching discounts' });
  }
};

// Update an existing discount for the tenant
const updateDiscount = async (req, res) => {
  try {
    const tenantId = getTenantId(req);
    const { discountId } = req.params;
    const { name, type, value, startDate, endDate, productIds, variantIds } = req.body;

    const discount = await Discount.findOne({ 
      where: { id: discountId, tenant_id: tenantId } 
    });

    if (!discount) {
      return res.status(404).json({ error: 'Discount not found' });
    }

    discount.name = name || discount.name;
    discount.type = type || discount.type;
    discount.value = value || discount.value;
    discount.startDate = startDate || discount.startDate;
    discount.endDate = endDate || discount.endDate;

    await discount.save();

    if (productIds && productIds.length > 0) {
      const products = await Product.findAll({ where: { id: productIds, tenant_id: tenantId } });
      await discount.setProducts(products);
    } else {
      await discount.setProducts([]);
    }

    if (variantIds && variantIds.length > 0) {
      const variants = await Variant.findAll({ where: { id: variantIds, tenant_id: tenantId } });
      await discount.setVariants(variants);
    } else {
      await discount.setVariants([]);
    }

    res.json(discount);
  } catch (error) {
    console.error('Error updating discount:', error);
    res.status(500).json({ error: 'Error updating discount' });
  }
};

// Delete a discount for the tenant
const deleteDiscount = async (req, res) => {
  try {
    const tenantId = getTenantId(req);
    const { discountId } = req.params;

    const discount = await Discount.findOne({ 
      where: { id: discountId, tenant_id: tenantId } 
    });

    if (!discount) {
      return res.status(404).json({ error: 'Discount not found' });
    }

    await discount.destroy();

    res.json({ message: 'Discount deleted successfully' });
  } catch (error) {
    console.error('Error deleting discount:', error);
    res.status(500).json({ error: 'Error deleting discount' });
  }
};

module.exports = {
  createDiscount,
  getAllDiscounts,
  updateDiscount,
  deleteDiscount,
};
