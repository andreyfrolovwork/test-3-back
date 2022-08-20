require("module-alias/register");
const { sequelize } = require("./models/models-export.js");

const PORT = process.env.APP_PORT;
const app = require("./app.js");
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, () =>
        console.log(`Server has been started on port: ${PORT}`)
      );
    }
  } catch (e) {
    console.log(e);
  }
};

start().then();
