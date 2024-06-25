'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'expiryDate', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('Products', 'threshold', {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
      defaultValue: 0, // You can set a default value if needed
    });

    await queryInterface.addColumn('Products', 'purchaseprice', {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
      defaultValue: 0.0, // You can set a default value if needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'expiryDate');
    await queryInterface.removeColumn('Products', 'threshold');
    await queryInterface.removeColumn('Products', 'purchaseprice');
  },
};
