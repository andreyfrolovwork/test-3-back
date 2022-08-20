const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return tokens.init(sequelize, DataTypes);
};

class tokens extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        fk_user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "users",
            key: "id_user",
          },
        },
        refresh_token: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "tokens",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "fk_user_id",
            fields: [{ name: "fk_user_id" }],
          },
          {
            name: "tokens_pk",
            unique: true,
            fields: [{ name: "fk_user_id" }],
          },
        ],
      }
    );
  }
}
