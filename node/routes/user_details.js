const express = require('express');
const UserDetails = require('../models/UserDetails');

const router = express.Router();

// Route to get all user details
router.get('/', async (req, res) => {
  try {
    const details = await UserDetails.find({});
    res.json(details);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to save user details
router.post('/', async (req, res) => {
  try {
    const userDetails = new UserDetails(req.body);
    await userDetails.save();
    res.status(201).json({ message: 'User details saved successfully', userDetails });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
