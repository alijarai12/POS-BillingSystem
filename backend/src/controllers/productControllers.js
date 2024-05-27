const express = require('express');
const productRouter = express.Router();
const Product = require('../models/Product');
const Variant = require('../models/Variant'); // Import Variant model

// Create a new product
const createProduct= async (req, res) => {
  try {
    const { name, description, price, stock, category, company, brand, variants } = req.body;
    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      company,
      brand,
    });

    // Create variants if provided
    if (variants && variants.length > 0) {
      for (let variant of variants) {
        await Variant.create({ ...variant, productId: newProduct.productId });
      }
    }

    const productWithVariants = await Product.findByPk(newProduct.productId, {
      include: [{ model: Variant, as: 'variants' }]
    });

    res.status(201).json(productWithVariants);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
}

// Get all products
const getAllProducts= async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Variant, as: 'variants' }] // Include variants in response
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
}

// Get a single product by ID
const getProductById= async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId, {
      include: [{ model: Variant, as: 'variants' }] // Include variants in response
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Error fetching product' });
  }
}

// Update a product
const updateProduct= async (req, res) => {
  const productId = req.params.id;
  try {
    const [updated] = await Product.update(req.body, {
      where: { productId: productId }
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(productId, {
        include: [{ model: Variant, as: 'variants' }] // Include variants in response
      });
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
}

// Delete a product
const deleteProduct= async (req, res) => {
  const productId = req.params.id;
  try {
    const deleted = await Product.destroy({
      where: { productId: productId }
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
}


module.exports = {createProduct,getAllProducts,getProductById,updateProduct,deleteProduct}
