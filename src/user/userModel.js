const mongoose = require('mongoose');

const booking = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

const Contact = mongoose.model('Contact', booking);

module.exports = Contact;
