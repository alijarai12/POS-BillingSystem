const express = require("express");
const Variant = require("../models/Variant");
const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");
// Create a new variant
// exports.createVariant = async (req, res) => {
//     try {
//       const { name, value, SKU, price, stock, barcode, image, weight, length, width, height, attributes, productId } = req.body;
//       const product = await Product.findByPk(productId);
//       if (!product) {
//         return res.status(404).json({ message: 'Product not found' });
//       }
//       const variant = await Variant.create({ name, value, SKU, price, stock, barcode, image, weight, length, width, height, attributes, productId });
//       res.status(201).json(variant);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
exports.createVariant = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.filename;
    }

    // Parse attributes if they are in JSON string format
    if (typeof req.body.attributes === "string") {
      req.body.attributes = JSON.parse(req.body.attributes);
    }

    const {
      name,
      color,
      SKU,
      price,
      stock,
      expiryDate,
      purchaseprice,
      threshold,
      barcode,
      image,
      weight,
      length,
      width,
      height,
      attributes = [], // Default to an empty array if undefined
      size,
      productId,
    } = req.body;

    const variant = await Variant.create({
      name,
      color,
      SKU,
      price,
      stock,
      expiryDate,
      purchaseprice,
      threshold,
      barcode,
      image,
      weight,
      length,
      width,
      height,
      size,
      attributes,
      productId,
    });

    res.status(201).json(variant);
  } catch (error) {
    console.error("Error creating variant:", error);
    res.status(500).json({ error: "Error creating variant" });
  }
};

// Get all variants
// exports.getAllVariants = async (req, res) => {
//   try {
//     const variants = await Variant.findAll({ include: { model: Product, as: 'product' } });
//     res.status(200).json(variants);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
exports.getAllVariants = async (req, res) => {
  try {
    const variants = await Variant.findAll({
      // include: [{ model: Product, as: 'product' }] // Include product in response
      // attributes: { exclude: ['product'] }, // Exclude the product field
    });
    res.json(variants);
  } catch (error) {
    console.error("Error fetching variants:", error);
    res.status(500).json({ error: "Error fetching variants" });
  }
};

// Get a single variant by ID
// exports.getVariantById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const variant = await Variant.findByPk(id, { include: { model: Product, as: 'product' } });
//     if (variant) {
//       res.status(200).json(variant);
//       console.log(id)
//     } else {
//       res.status(404).json({ message: 'Variant not found' });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
exports.getVariantById = async (req, res) => {
  const variantId = req.params.id;
  try {
    const variant = await Variant.findByPk(variantId, {
      include: [{ model: Product, as: "product" }], // Include product in response
    });
    if (!variant) {
      return res.status(404).json({ error: "Variant not found" });
    }
    res.json(variant);
  } catch (error) {
    console.error("Error fetching variant:", error);
    res.status(500).json({ error: "Error fetching variant" });
  }
};

// Update a variant by ID
// exports.updateVariant= async (req, res) => {
//     const { id } = req.params;
//     const { name, value, SKU, price, stock, barcode, image, weight, length, width, height, attributes, productId } = req.body;

//     try {
//       const variant = await Variant.findByPk(id);

//       if (!variant) {
//         return res.status(404).json({ error: 'Variant not found' });
//       }

//       variant.name = name || variant.name;
//       variant.value = value || variant.value;
//       variant.SKU = SKU || variant.SKU;
//       variant.price = price || variant.price;
//       variant.stock = stock || variant.stock;
//       variant.barcode = barcode || variant.barcode;
//       variant.image = image || variant.image;
//       variant.weight = weight || variant.weight;
//       variant.length = length || variant.length;
//       variant.width = width || variant.width;
//       variant.height = height || variant.height;
//       variant.attributes = attributes || variant.attributes;
//       variant.productId = productId || variant.productId;

//       await variant.save();

//       res.json(variant);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   }

// exports.updateVariant= async (req, res) => {
//     const variantId = req.params.id;
//     try {
//       const [updated] = await Variant.update(req.body, {
//         where: { variantId: variantId }
//       });
//       if (updated) {
//         const updatedVariant = await Variant.findByPk(variantId, {
//           include: [{ model: Product, as: 'product' }] // Include product in response
//         });
//         res.json(updatedVariant);
//       } else {
//         res.status(404).json({ error: 'Variant not found' });
//       }
//     } catch (error) {
//       console.error('Error updating variant:', error);
//       res.status(500).json({ error: 'Error updating variant' });
//     }
//   }

exports.updateVariantById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    console.log('Received data:', updateData);

    // Check if attributes need to be parsed
    if (updateData.attributes) {
      if (typeof updateData.attributes === 'string') {
        updateData.attributes = JSON.parse(updateData.attributes);
      }
    }

    // Check if the barcode is unique
    if (updateData.barcode) {
      const existingVariant = await Variant.findOne({ where: { barcode: updateData.barcode } });
      if (existingVariant && existingVariant.id !== parseInt(id, 10)) {
        return res.status(400).json({ error: 'Barcode must be unique' });
      }
    }

    // Find the variant by ID
    const variant = await Variant.findByPk(id);
    if (variant) {
      // Check if an image is uploaded
      if (req.file) {
        updateData.image = `${req.file.filename}`; // Store relative path
      }

      console.log('Final update data:', updateData);

      // Update the variant with the new data
      await variant.update(updateData);
      res.status(200).json(variant);
    } else {
      res.status(404).json({ message: 'Variant not found' });
    }
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: error.message });
  }
};


// Delete a variant by ID
// exports.deleteVariant= async (req, res) => {
//     const { id } = req.params;

//     try {
//       const variant = await Variant.findByPk(id);

//       if (!variant) {
//         return res.status(404).json({ error: 'Variant not found' });
//       }

//       await variant.destroy();
//       res.json({ message: 'Variant deleted successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   }
exports.deleteVariant = async (req, res) => {
  const variantId = req.params.id;
  try {
    const deleted = await Variant.destroy({
      where: { variantId: variantId },
    });
    if (deleted) {
      res.json({ message: "Variant deleted successfully" });
    } else {
      res.status(404).json({ error: "Variant not found" });
    }
  } catch (error) {
    console.error("Error deleting variant:", error);
    res.status(500).json({ error: "Error deleting variant" });
  }
};
