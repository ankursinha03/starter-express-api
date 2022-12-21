require("dotenv").config({ path: "./src/env/.env" });
const mongoose = require("mongoose");
const fs = require("fs");

// checking connection to db
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error.message));
db.once("open", () => console.log("connected to database"));
