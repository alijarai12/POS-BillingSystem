'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Uncomment role_id and tenant_id references
    await queryInterface.changeColumn('Users', 'role_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Roles',
        key: 'role_id'
      }
    });

    await queryInterface.changeColumn('Users', 'tenant_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Tenants',
        key: 'tenant_id'
      }
    });

    // Add unique constraints to specific fields
    await queryInterface.addConstraint('Users', {
      fields: ['username'],
      type: 'unique',
      name: 'unique_username_constraint'
    });

    await queryInterface.addConstraint('Users', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email_constraint'
    });

    await queryInterface.addConstraint('Users', {
      fields: ['contact'],
      type: 'unique',
      name: 'unique_contact_constraint'
    });

    await queryInterface.addConstraint('Users', {
      fields: ['last_name'],
      type: 'unique',
      name: 'unique_last_name_constraint'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert changes made in 'up' method

    // Remove unique constraints
    await queryInterface.removeConstraint('Users', 'unique_username_constraint');
    await queryInterface.removeConstraint('Users', 'unique_email_constraint');
    await queryInterface.removeConstraint('Users', 'unique_contact_constraint');
    await queryInterface.removeConstraint('Users', 'unique_last_name_constraint');

    // Uncomment role_id and tenant_id references
    await queryInterface.changeColumn('Users', 'role_id', {
      type: Sequelize.INTEGER,
      allowNull: true
      // If you previously had specific references, add them back here
    });

    await queryInterface.changeColumn('Users', 'tenant_id', {
      type: Sequelize.INTEGER,
      allowNull: true
      // If you previously had specific references, add them back here
    });
  }
};
