'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      middle_name: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profile_image: {
        type: Sequelize.BLOB('long'), // Type for image
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [6, 255] // Example length constraints
        },
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      role_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Roles', // Ensure Roles table exists
        //   key: 'role_id'
        // },
        allowNull: true
      },
      tenant_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Tenants', // Ensure Tenants table exists
        //   key: 'tenant_id'
        // },
        allowNull: true // Nullable for SuperAdmin
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    // Drop Users table
    await queryInterface.dropTable('Users');
  }
};