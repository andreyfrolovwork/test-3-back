const Router = require("express").Router;
const AuthController = require("../controllers/AuthController.js");
const authRouter = new Router();

authRouter.post("/signup", AuthController.registration);
authRouter.post("/login", AuthController.login);
authRouter.post("/logout", AuthController.logout);
authRouter.get("/refresh", AuthController.refresh);

module.exports = authRouter;
