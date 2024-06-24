// File: models/Discount.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');
const Variant = require('./Variant');
const Tenant = require('./Tenant');

const Discount = sequelize.define(
  'Discount',
  {
    discountId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    type: {
      type: DataTypes.ENUM('fixed', 'percentage'),
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isValidDiscountValue(value) {
          if (this.type === 'percentage' && (value < 0 || value > 100)) {
            throw new Error('Percentage discount must be between 0 and 100');
          }
          if (this.type === 'fixed' && value < 0) {
            throw new Error('Fixed discount must be a positive value');
          }
        }
      },
      set(value) {
        if (this.type === 'percentage' && typeof value === 'string' && value.includes('%')) {
          value = parseFloat(value.replace('%', ''));
        }
        this.setDataValue('value', parseFloat(value));
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tenant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tenant,
        key: 'tenant_id'
      },
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'Discount',
  }
);

// Define the many-to-many association with Products
Discount.belongsToMany(Product, {
  through: 'DiscountProducts',
  foreignKey: 'discountId',
  otherKey: 'productId',
  as: 'products',
});

// Define the many-to-many association with Variants
Discount.belongsToMany(Variant, {
  through: 'DiscountVariants',
  foreignKey: 'discountId',
  otherKey: 'variantId',
  as: 'variants',
});

module.exports = Discount;