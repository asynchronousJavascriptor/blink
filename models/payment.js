const mongoose = require("mongoose");
const Joi = require("joi");

// Payment Schema with Mongoose Validation
const paymentSchema = mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    method: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    transactionID: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Joi Validation Schema
const validatePayment = (data) => {
  const schema = Joi.object({
    order: Joi.string().required(),
    amount: Joi.number().min(0).required(),
    method: Joi.string().required(),
    status: Joi.string().required(),
    transactionID: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = {
  paymentModel: mongoose.model("payment", paymentSchema),
  validatePayment,
};
