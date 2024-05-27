const { DataTypes } = require('sequelize');
const centralSequelize = require('../config/db');
const Product = require('./Product'); // Import the Product model

const Variant = centralSequelize.define(
  'Variant',
  {
    variantId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    SKU: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    barcode: {
      type: DataTypes.STRING,
      allowNull: true, // Make barcode optional
      unique: true,
      trim: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // Make image optional
      trim: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true, // Make weight optional
      validate: {
        min: 0,
      },
    },
    length: {
      type: DataTypes.FLOAT,
      allowNull: true, // Make length optional
      validate: {
        min: 0,
      },
    },
    width: {
      type: DataTypes.FLOAT,
      allowNull: true, // Make width optional
      validate: {
        min: 0,
      },
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true, // Make height optional
      validate: {
        min: 0,
      },
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true, // Make size optional
      trim: true,
    },
    attributes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true, // Make attributes optional
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Product', // name of the related table
        key: 'productId',
      },
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.product; // Remove the `product` key from the response
        return ret;
      },
    },
  }
);

module.exports = Variant;
