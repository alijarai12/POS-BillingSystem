'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Products', 'SKU', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      trim: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Products', 'SKU', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      trim: true,
    });
  },
};
