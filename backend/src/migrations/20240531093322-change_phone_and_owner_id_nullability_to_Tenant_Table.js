'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tenants', 'phone_number', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Tenants', 'owner_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tenants', 'phone_number', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Tenants', 'owner_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
