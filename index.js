require("dotenv").config({ path: "./src/env/.env" });

const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT;
const path = require("path");

require("./src/database/server.js");

const apiRouter = require("./src/api/api");

// const verificationRouter = require("./src/api/routers/otpVerificationRoutes");

//should be above body parser call to work
// app.use(bodyParser.json());

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

global.appRoot = path.resolve(__dirname);

app.use("/api", apiRouter);
app.get("/", (req, res) => {
  return res.send("Intellectual Property of THE MATRIX LABS");
});

app.listen(port || 4000, () => console.log(`server started at port ${port}`));
