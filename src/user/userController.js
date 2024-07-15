const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Contact = require('../models/contact'); // Adjust the path as necessary

const router = express.Router();

// Middleware for parsing JSON bodies
router.use(express.json());

// Validation middleware
const contactValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('phoneNumber')
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\+?[1-9]\d{1,14}$/).withMessage('Please fill a valid phone number'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please fill a valid email address'),
  body('message').notEmpty().withMessage('Message is required'),
];

// Register route
router.post('/register', contactValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation errors', errors: errors.array() });
  }

  const { name, phoneNumber, email, message } = req.body;

  try {
    // Create a new contact entry
    const newContact = new Contact({ name, phoneNumber, email, message });

    // Save the contact to the database
    await newContact.save();

    // Send a success response
    res.status(201).json({ message: 'Contact registered successfully!', contact: newContact });
  } catch (error) {
    // Handle validation errors or other errors
    res.status(400).json({ message: 'Error registering contact', error: error.message });
  }
});

module.exports = router;
