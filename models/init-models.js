const DataTypes = require("sequelize").DataTypes;
const _SequelizeMeta = require("./SequelizeMeta");
const _tokens = require("./tokens");
const _users = require("./users");
const _contacts = require("./contacts.js");

function initModels(sequelize) {
  const SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  const tokens = _tokens(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);
  const contacts = _contacts(sequelize, DataTypes);

  tokens.belongsTo(users, {
    as: "fk_user",
    foreignKey: "fk_user_id",
    onUpdate: "NO ACTION",
    onDelete: "SET NULL",
  });

  users.hasOne(tokens, {
    as: "token",
    foreignKey: "fk_user_id",
    onUpdate: "NO ACTION",
    onDelete: "SET NULL",
  });

  users.hasMany(contacts, {
    as: "contacts",
    foreignKey: "fk_id_user",
    onUpdate: "SET NULL",
    onDelete: "SET NULL",
  });

  return {
    SequelizeMeta,
    tokens,
    users,
    contacts,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
