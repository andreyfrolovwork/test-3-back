const authRouter = require("./authRouter.js");
const adminRouter = require("./adminRouter.js");
module.exports = (app) => {
  app.use("/crm-api", authRouter);
  app.use("/crm-api/admin", adminRouter);
};
