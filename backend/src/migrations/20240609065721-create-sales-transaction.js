'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SalesTransactions', {
      salesId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      salesRep: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unitPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      totalValue: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      paymentMethod: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Name of the Users table
          key: 'id', // Primary key column in the Users table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products', // Name of the Products table
          key: 'productId', // Primary key column in the Products table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      VariantId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Variants', // Name of the Variants table
          key: 'variantId', // Primary key column in the Variants table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SalesTransactions');
  }
};
