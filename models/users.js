const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return users.init(sequelize, DataTypes);
};

class users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id_user: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        deleted: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        role: {
          type: DataTypes.ENUM("admin", "admin_not_activated", "artist"),
          allowNull: true,
          defaultValue: "admin",
        },
      },
      {
        sequelize,
        tableName: "users",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            name: "users_pkey",
            unique: true,
            fields: [{ name: "id_user" }],
          },
        ],
      }
    );
  }
}
