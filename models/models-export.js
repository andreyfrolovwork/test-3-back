require("dotenv").config();
const initModels = require("./init-models.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
});
const models = initModels(sequelize);
module.exports.models = models;
module.exports.sequelize = sequelize;
