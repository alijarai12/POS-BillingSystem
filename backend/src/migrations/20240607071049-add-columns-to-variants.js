"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add new columns
    await queryInterface.addColumn("Variants", "expiryDate", {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn("Variants", "purchaseprice", {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
      defaultValue: 0, // You can set a default value if needed
    });

    await queryInterface.addColumn("Variants", "threshold", {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
      defaultValue: 0.0, // You can set a default value if needed
    });

    // Rename column
    await queryInterface.renameColumn("Variants", "value", "color");
  },

  down: async (queryInterface, Sequelize) => {
    // Remove added columns
    await queryInterface.removeColumn("Variants", "expiryDate");
    await queryInterface.removeColumn("Variants", "purchaseprice");
    await queryInterface.removeColumn("Variants", "threshold");

    // Rename back to original column
    await queryInterface.renameColumn("Variants", "color", "value");
  },
};
