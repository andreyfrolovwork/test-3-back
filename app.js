const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/ErrorMiddleware.js");
const routes = require("./router/index.js");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
routes(app);
app.use(errorMiddleware);

module.exports = app;
