const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);  // הוסף לוג זה
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found for email:', email);  // הוסף לוג זה
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    console.log('Password match result:', isMatch);  // הוסף לוג זה

    if (isMatch) {
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });

      console.log('Token generated successfully');  // הוסף לוג זה
      res.json({
        token,
        role: user.role
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);  // שנה את זה ללוג מפורט יותר
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});