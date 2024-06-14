const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Variant = require('./Variant'); // Import the Variant model

const Product = sequelize.define(
  'Product',
  {
        productId: {
          type: DataTypes.STRING,
          autoIncrement: true,
          primaryKey: true,
        },
        productname: {
          type: DataTypes.STRING,
          allowNull: false,
          trim: true,
        },
        description: {
          type: DataTypes.STRING,
          trim: true,
        },
        SKU: {
          type: DataTypes.STRING,
          allowNull: true, // Allow null values for SKU
          unique: true, // Ensure SKU values are unique
          trim: true, // Trim whitespace from SKU values
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: {
            min: 0,
          },
        },
        discountedPrice: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 0,
          },
        },
        category: { type: DataTypes.STRING, allowNull: false },
        brand: { type: DataTypes.STRING, allowNull: true },
        company: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        hooks: {
          beforeCreate: (product) => {
            if (!product.SKU) {
              product.SKU = `${product.company
                .substring(0, 3)
                .toUpperCase()}-${Date.now().toString().slice(-5)}`;
            }
          },
        },
         sequelize, // Pass the initialized sequelize object
        modelName: 'Product', // Set the model name explicitly
      }
);
Product.hasMany(Variant, { foreignKey: 'productId', as: 'variants' });

Variant.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = Product;