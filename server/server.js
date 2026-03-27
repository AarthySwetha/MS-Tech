import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Contact from './models/Contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mstech')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: 'Name, email, service, and message are required fields.' });
    }

    // Create a new contact entry
    const newContact = new Contact({
      name,
      email,
      phone,
      service,
      message,
    });

    // Save to MongoDB
    await newContact.save();

    res.status(201).json({ message: 'Contact request submitted successfully!' });
  } catch (error) {
    console.error('Error saving contact request:', error);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const cors = require("cors");
app.use(cors());