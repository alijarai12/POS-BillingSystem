'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Discounts', 'tenant_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Tenants',
        key: 'tenant_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Discounts', 'tenant_id');
  },
};
