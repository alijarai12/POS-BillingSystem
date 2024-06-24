// File: models/Tax.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');
const Variant = require('./Variant');

const Tax = sequelize.define('Tax', {
  taxId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.ENUM('percentage', 'fixed'),
    allowNull: false,
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false, // Ensure rate is required    
    validate: {
      min: 0,   
      max: 100,

    },
    
    },
  
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
 
  productId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Product',
      key: 'productId',
    },
  },
  variantId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Variant',
      key: 'variantId',
    },
  },
}, {
  sequelize,
  modelName: 'Tax',
});

// Define associations
Tax.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Tax.belongsTo(Variant, { foreignKey: 'variantId', as: 'variant' });

module.exports = Tax;
