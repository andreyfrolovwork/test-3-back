"use strict";
const { DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contacts", {
      id_contact: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      fk_id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(255),
      },
      phone: {
        type: DataTypes.STRING(255),
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.Sequelize.fn("now"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.Sequelize.fn("now"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("releases");
  },
};
