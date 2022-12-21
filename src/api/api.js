const api = require("express").Router();
const eventRouter = require("./routers/transaction");

// const { verifyJWT } = require("../middleware/jwt");

// api.use("/", verifyJWT);
api.use("/transaction", eventRouter);

module.exports = api;
