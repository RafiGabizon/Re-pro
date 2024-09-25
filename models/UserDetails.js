const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  birthDate: { type: Date, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  englishLevel: { type: String, required: true },
  additionalLanguage: { type: String },
  additionalLanguageLevel: { type: String },
  usVisa: { type: Boolean },
  additionalPassport: { type: Boolean },
  additionalPassportCountry: { type: String },
  availabilityDate: { type: Date, required: true },
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  currentlyEmployed: { type: Boolean, required: true },
});

module.exports = mongoose.model('UserDetails', UserDetailsSchema);
