const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      unique: true, // Ensure category names are unique
    },
  },
  { timestamps: true }
);

// Joi Validation Schema
const validateCategory = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(data);
};

module.exports = {
  categoryModel: mongoose.model("category", categorySchema),
  validateCategory,
};
