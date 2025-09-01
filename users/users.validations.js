const joi = require("joi");

const userSchema = joi.object({
  username: joi.string().min(3).max(40).required(),
  email: joi.string().email().required(),
  Password: joi.string().min(8).max(20).required(),
  isActive: joi.boolean().optional(),
});

const userUpdateSchema = joi.object({
  userId: joi.number().required(),
  username: joi.string().min(3).max(40).optional(),
  email: joi.string().email().optional(),
  Password: joi.string().min(8).max(20).optional(),
  isActive: joi.boolean().optional(),
});
const loginschema = joi.object({
  email: joi.string().email().required(),
  Password: joi.string().min(8).max(20).required(),
});
const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: true });

  if (error) {
    res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
    return;
  }
  next();
};

const validateUpdateUser = (req, res, next) => {
  const data = { ...req.body, userId: Number(req.params.userId) };
  const { error } = userUpdateSchema.validate(data, { abortEarly: false });
  if (error) {
    res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
    return;
  }
  next();
};

const validatelogin = (req, res, next) => {
  const { error } = loginschema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({
      errors: error.map((err) => err.message),
    });
    return;
  }
  next();
};

module.exports = {
  validateUser,
  validateUpdateUser,
  validatelogin,
};
