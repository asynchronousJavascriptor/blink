const mongoose = require("mongoose");
const Joi = require("joi");

const AdressSchema = mongoose.Schema({
  state: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  zip: {
    type: Number,
    required: true,
    min: 10000,
    max: 999999, // Assuming 5-digit ZIP codes
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
      type: String,
      minlength: 6,
    },
    phone: {
      type: Number,
      match: /^[0-9]{10}$/, // Assuming 10-digit phone numbers
    },
    addresses: {
      type: [AdressSchema],
    },
  },
  { timestamps: true }
);

const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    addresses: Joi.array()
      .items(
        Joi.object({
          state: Joi.string().min(2).max(50).required(),
          zip: Joi.number().min(10000).max(99999).required(),
          city: Joi.string().min(2).max(50).required(),
          address: Joi.string().min(5).max(255).required(),
        })
      )
      .max(5), // Maximum 5 addresses
  });

  return schema.validate(data);
};

module.exports = {
  userModel: mongoose.model("user", userSchema),
  validateUser,
};
