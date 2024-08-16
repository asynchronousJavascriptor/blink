const mongoose = require("mongoose");
const Joi = require("joi");

// Product Schema with Mongoose Validation
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

// Joi Validation Schema
const validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().min(3).max(50).required(),
    stock: Joi.number().required(),
    description: Joi.string().optional(),
    image: Joi.string().optional(),
  });

  return schema.validate(data);
};

module.exports = {
  productModel: mongoose.model("product", productSchema),
  validateProduct,
};
