const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  gender: { type: String },
  birthDate: { type: Date },
  country: { type: String },
  city: { type: String },
  englishLevel: { type: String },
  additionalLanguage: { type: String },
  additionalLanguageLevel: { type: String },
  usVisa: { type: Boolean },
  additionalPassport: { type: Boolean },
  additionalPassportCountry: { type: String },
  availabilityDate: { type: Date },
  jobTitle: { type: String },
  companyName: { type: String },
  currentlyEmployed: { type: Boolean },
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
