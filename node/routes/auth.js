const express = require('express');
const bcrypt = require('bcrypt');
const { UserModel, validateUser, validateLogin, createToken } = require('../models/userModel');

const router = express.Router();

// נתיב להרשמה
router.post('/Register', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ error: 'User already registered.' });

    user = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      // הוספת שדות נוספים מ-RegisterStepTwo
      gender: req.body.gender,
      birthDate: req.body.birthDate,
      country: req.body.country,
      city: req.body.city,
      englishLevel: req.body.englishLevel,
      additionalLanguage: req.body.additionalLanguage,
      additionalLanguageLevel: req.body.additionalLanguageLevel,
      usVisa: req.body.usVisa,
      additionalPassport: req.body.additionalPassport,
      additionalPassportCountry: req.body.additionalPassportCountry,
      availabilityDate: req.body.availabilityDate,
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
      currentlyEmployed: req.body.currentlyEmployed,
    });

    await user.save();

    const token = createToken(user._id, user.role);
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    }).status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// נתיב להתחברות (כבר קיים ב-users.js, אך נעתיק אותו לכאן)
router.post('/login', async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password.' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid email or password.' });

    const token = createToken(user._id, user.role);
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    }).json({ message: 'Logged in successfully', userId: user._id, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;