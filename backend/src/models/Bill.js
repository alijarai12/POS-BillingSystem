const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const  Tenant= require('./Tenant');


const Bill = sequelize.define(
  'Bill',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    customerNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
   
    date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    paymentMode: {
      type: DataTypes.STRING,
      allowNull: false,
    
    },
    cartItems: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
      
    },
    subTotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: 0,
      },
    },
    tax: {
      type: DataTypes.FLOAT,
      allowNull: true,
      
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
     
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: 0,
      },
    },
    paymentStatus:
    {
      type: DataTypes.STRING,
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
    timestamps: true,
  }
);



module.exports = Bill;