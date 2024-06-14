'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Variants', {
      variantId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      SKU: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      barcode: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      length: {
        type: Sequelize.FLOAT,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      width: {
        type: Sequelize.FLOAT,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      height: {
        type: Sequelize.FLOAT,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      attributes: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products', // name of the related table (pluralized)
          key: 'productId',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Variants');
  }
};
