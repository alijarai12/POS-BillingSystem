'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Role_Permissions', {
      fields: ['permission_id'],
      type: 'foreign key',
      name: 'Role_Permissions_permission_id_fkey',
      references: {
        table: 'Permissions',
        field: 'permission_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Role_Permissions', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'Role_Permissions_role_id_fkey',
      references: {
        table: 'Roles',
        field: 'role_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Role_Permissions', 'Role_Permissions_permission_id_fkey');
    await queryInterface.removeConstraint('Role_Permissions', 'Role_Permissions_role_id_fkey');
  }
};
