const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Transact",
  new mongoose.Schema({
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    // Time: {
    //   type: String,
    //   required: true,
    // },
    Amount: {
      type: Number,
      required: true,
    },
  })
);
