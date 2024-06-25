const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Product = require("./Product");
const Variant = require("./Variant")

const SalesTransaction = sequelize.define("SalesTransaction", {
    salesId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  salesRep: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unitPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
});

SalesTransaction.belongsTo(User);
SalesTransaction.belongsTo(Product);
SalesTransaction.belongsTo(Variant);
module.exports = SalesTransaction;
