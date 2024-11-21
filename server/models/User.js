const mongoose = require('mongoose'); // Imports Mongoose library for MongoDB object modeling.
const bcrypt = require('bcryptjs'); // Imports bcrypt library for password hashing.

// Define the schema for the User collection.
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true }, // User's username, required field.
  email: { type: String, required: true, unique: true }, // User's email, must be unique and required.
  phone: { type: String, required: true, unique: true }, // User's phone number, must be unique and required.
  password: { type: String, required: true }, // User's password, required field.
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Role, either 'user' or 'admin', defaults to 'user'.
  gender: { type: String }, // Optional gender field.
  birthDate: { type: Date }, // Optional date of birth.
  country: { type: String }, // Optional country field.
  city: { type: String }, // Optional city field.
  englishLevel: { type: String }, // Optional field for English proficiency level.
  additionalLanguage: { type: String }, // Optional field for an additional language.
  additionalLanguageLevel: { type: String }, // Optional field for proficiency level in the additional language.
  usVisa: { type: Boolean }, // Boolean indicating if the user has a US visa.
  additionalPassport: { type: Boolean }, // Boolean indicating if the user has an additional passport.
  additionalPassportCountry: { type: String }, // Country of the additional passport, if applicable.
  availabilityDate: { type: Date }, // Date indicating when the user is available for work.
  jobTitle: { type: String }, // Optional field for the user's job title.
  companyName: { type: String }, // Optional field for the user's company name, if employed.
  currentlyEmployed: { type: Boolean }, // Boolean indicating if the user is currently employed.
});

// Middleware to hash the password before saving the user document.
UserSchema.pre('save', async function(next) {
  // Check if the password field has been modified; if not, skip hashing.
  if (!this.isModified('password')) return next();
  
  // Hash the password using bcrypt with a salt round of 12.
  this.password = await bcrypt.hash(this.password, 12);
  next(); // Proceed to save the document.
});

// Method to compare entered password with the hashed password stored in the database.
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Returns true if passwords match, false otherwise.
};

// Export the User model based on the UserSchema.
module.exports = mongoose.model('User', UserSchema);
