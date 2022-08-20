const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return contacts.init(sequelize, DataTypes);
};

class contacts extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id_contact: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        fk_id_user: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "users",
            key: "id_user",
          },
        },
      },
      {
        sequelize,
        tableName: "contacts",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
