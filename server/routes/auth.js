const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

require('dotenv').config();

// נתיב לרישום משתמש חדש
router.post('/register', async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // בדוק אם המשתמש כבר קיים לפי כתובת האימייל
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`User already exists for email: ${email}`);
      return res.status(400).json({ message: 'User already exists' });
    }

    // יצירת סיסמה מוצפנת
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // יצירת משתמש חדש
    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword
    });

    // שמירת המשתמש במסד הנתונים
    await newUser.save();
    console.log('User registered successfully:', newUser);

    // יצירת טוקן JWT
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    // החזרת התשובה ללקוח
    res.status(201).json({
      token,
      role: newUser.role
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// נתיב לטיפול בשלב השני של ההרשמה
router.post('/register2', async (req, res) => {
  try {
    const {
      gender,
      birthDate,
      country,
      city,
      englishLevel,
      additionalLanguage,
      additionalLanguageLevel,
      usVisa,
      additionalPassport,
      additionalPassportCountry,
      availabilityDate,
      jobTitle,
      companyName,
      currentlyEmployed,
    } = req.body;

    // עדכון פרטי המשתמש במסד הנתונים
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        gender,
        birthDate,
        country,
        city,
        englishLevel,
        additionalLanguage,
        additionalLanguageLevel,
        usVisa,
        additionalPassport,
        additionalPassportCountry,
        availabilityDate,
        jobTitle,
        companyName,
        currentlyEmployed,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User details updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// נתיב לכניסת משתמש קיים
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    console.log('Password match result:', isMatch);

    if (isMatch) {
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });

      console.log('Token generated successfully');
      res.json({
        token,
        role: user.role
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
