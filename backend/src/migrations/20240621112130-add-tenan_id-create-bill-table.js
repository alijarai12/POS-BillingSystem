'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Set a default value for tenant_id
    await queryInterface.addColumn('Bills', 'tenant_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1, // Replace with an actual tenant_id value
      references: {
        model: 'Tenants',
        key: 'tenant_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // Update existing null values to the default value
    await queryInterface.sequelize.query(`
      UPDATE "Bills"
      SET "tenant_id" = 1
      WHERE "tenant_id" IS NULL;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Bills', 'tenant_id');
  },
};
