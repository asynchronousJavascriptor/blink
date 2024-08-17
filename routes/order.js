const express = require("express");
const { paymentModel } = require("../models/payment");
const router = express.Router();

router.get("/:orderid/:paymentid/:signature", async function (req, res) {
  let paymentDetails = await paymentModel.findOne({
    orderId: req.params.orderid,
  });

  if (!paymentDetails) return res.send("Sorry, this order does not exist");
  if (
    req.params.signature === paymentDetails.signature &&
    req.params.paymentid === paymentDetails.paymentId
  ) {
    res.send("valid payment");
  } else {
    res.send("invalid payment");
  }
});

module.exports = router;
