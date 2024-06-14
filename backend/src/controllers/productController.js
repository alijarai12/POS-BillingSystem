const Product = require('../models/Product');
const Variant = require('../models/Variant');

const createProduct = async (req, res) => {
  try {
    const { productname, description, price,discountedPrice, stock, category, company, brand, variants } = req.body;
    const newProduct = await Product.create({
      productname,
      description,
      price,
      discountedPrice,
      stock,
      category,
      company,
      brand,
    });

    // if (variants && variants.length > 0) {
    //   await Variant.bulkCreate(variants.map(variant => ({ ...variant, productId: newProduct.productId })));
    // }

    const productWithVariants = await Product.findByPk(newProduct.productId, {
      include: [{ model: Variant, as: 'variants' }]
    });

    res.status(201).json(productWithVariants);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Variant, as: 'variants' }]
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId, {
      include: [{ model: Variant, as: 'variants' }]
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Error fetching product' });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const [updated] = await Product.update(req.body, {
      where: { productId }
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(productId, {
        include: [{ model: Variant, as: 'variants' }]
      });
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deleted = await Product.destroy({
      where: { productId }
    });
    if (deleted) {
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
