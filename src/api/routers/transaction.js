const eventsRouter = require("express").Router();

require("dotenv").config({ path: "../../env/.env" });

const Transact = require("../../database/models/transact");

eventsRouter.post("/addTransaction", async (req, res) => {
  const trans = new Transact({
    Amount: Number(req.body.amount),
  });
  trans
    .save()
    .then((data) => {
      res.json({ message: "Successfully added the transaction" });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

eventsRouter.get("/getTransactions", async (req, res) => {
  Transact.find()
    .then((result) => {
      let amt = 0;
      let count = 0;
      for (x in result) {
        amt = amt + result[x].Amount;
        count = count + 1;
      }
      return res.status(200).json({
        totalTransactions: count,
        totalAmount: amt,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err,
      });
    });
});

module.exports = eventsRouter;
