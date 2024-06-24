'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'reset_password_token', {
      type: Sequelize.STRING,
      allowNull: true // Modify as per your application logic
    });
    await queryInterface.addColumn('Users', 'reset_password_expires', {
      type: Sequelize.DATE,
      allowNull: true // Modify as per your application logic
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'reset_password_token');
    await queryInterface.removeColumn('Users', 'reset_password_expires');
  }
};
