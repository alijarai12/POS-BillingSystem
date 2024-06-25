const Product = require("../models/Product");
const Variant = require("../models/Variant");
const fs = require("fs");
const path = require("path");
// const createProduct = async (req, res) => {
//   try {
//     const { productname, description, price, stock, category, company, brand, variants } = req.body;
//     const newProduct = await Product.create({
//       productname,
//       description,
//       price,
//       stock,
//       category,
//       company,
//       brand,
//     });

//     if (variants && variants.length > 0) {
//       await Variant.bulkCreate(variants.map(variant => ({ ...variant, productId: newProduct.productId })));
//     }

//     const productWithVariants = await Product.findByPk(newProduct.productId, {
//       include: [{ model: Variant, as: 'variants' }]
//     });

//     res.status(201).json(productWithVariants);
//   } catch (error) {
//     console.error('Error creating product:', error);
//     res.status(500).json({ error: 'Error creating product' });
//   }
// };
const createProduct = async (req, res) => {
  try {
    const {
      productname,
      description,
      price,
      stock,
      expiryDate,
      purchaseprice,
      threshold,
      category,
      company,
      brand,
      variants,
    } = req.body;
    let image = null;

    // Check if image file exists in the request
    if (req.file) {
      image = req.file.filename; // Get the filename of the uploaded image
    }

    // Create the new product with image
    const newProduct = await Product.create({
      productname,
      description,
      price,
      stock,
      expiryDate,
      purchaseprice,
      threshold,
      category,
      company,
      brand,
      image, // Add the image field to the product creation
    });

    if (variants && variants.length > 0) {
      // Associate variants with the new product
      await Variant.bulkCreate(
        variants.map((variant) => ({
          ...variant,
          productId: newProduct.productId,
        }))
      );
    }

    // Fetch the created product with variants
    const productWithVariants = await Product.findByPk(newProduct.productId, {
      include: [{ model: Variant, as: "variants" }],
    });

    res.status(201).json(productWithVariants);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Error creating product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Variant, as: "variants" }],
    });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId, {
      include: [{ model: Variant, as: "variants" }],
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Error fetching product" });
  }
};

// const updateProduct = async (req, res) => {
//   const productId = req.params.id;
//   try {
//     const [updated] = await Product.update(req.body, {
//       where: { productId },
//     });
//     if (updated) {
//       const updatedProduct = await Product.findByPk(productId, {
//         include: [{ model: Variant, as: "variants" }],
//       });
//       res.json(updatedProduct);
//     } else {
//       res.status(404).json({ error: "Product not found" });
//     }
//   } catch (error) {
//     console.error("Error updating product:", error);
//     res.status(500).json({ error: "Error updating product" });
//   }
// };
const updateProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    // Prepare the data to update
    const updateData = { ...req.body };

    // Check if an image is uploaded
    if (req.file) {
      // If a new image is uploaded, save it and update the image path in the product data
      updateData.image = `${req.file.filename}`;
    }

    // Update the product
    const [updated] = await Product.update(updateData, {
      where: { productId },
    });

    if (updated) {
      const updatedProduct = await Product.findByPk(productId, {
        include: [{ model: Variant, as: "variants" }],
      });
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
};

module.exports = updateProduct;

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deleted = await Product.destroy({
      where: { productId },
    });
    if (deleted) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
