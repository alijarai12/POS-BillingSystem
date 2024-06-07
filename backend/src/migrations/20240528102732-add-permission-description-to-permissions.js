'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Permissions', 'permission_description', {
      type: Sequelize.TEXT,
      allowNull: true, // Set to false if the field is required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Permissions', 'permission_description');
  }
};
