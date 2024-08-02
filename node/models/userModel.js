const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  gender: String,
  birthDate: Date,
  country: String,
  city: String,
  englishLevel: String,
  additionalLanguage: String,
  additionalLanguageLevel: String,
  usVisa: Boolean,
  additionalPassport: Boolean,
  additionalPassportCountry: String,
  availabilityDate: Date,
  jobTitle: String,
  companyName: String,
  currentlyEmployed: Boolean,
});

const UserModel = mongoose.model('User', userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(9).max(20).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    gender: Joi.string().valid('male', 'female', 'other'),
    birthDate: Joi.date(),
    country: Joi.string(),
    city: Joi.string(),
    englishLevel: Joi.string(),
    additionalLanguage: Joi.string(),
    additionalLanguageLevel: Joi.string(),
    usVisa: Joi.boolean(),
    additionalPassport: Joi.boolean(),
    additionalPassportCountry: Joi.string(),
    availabilityDate: Joi.date(),
    jobTitle: Joi.string(),
    companyName: Joi.string(),
    currentlyEmployed: Joi.boolean(),
  });

  return schema.validate(user);
};

const validateLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
  });

  return schema.validate(user);
};

const createToken = (userId, role) => {
  return jwt.sign({ _id: userId, role }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
};

module.exports = {
  UserModel,
  validateUser,
  validateLogin,
  createToken
};