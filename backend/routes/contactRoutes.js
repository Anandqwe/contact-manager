const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contacts - Save a new contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      message
    });

    const savedContact = await contact.save();
    res.status(201).json({
      success: true,
      message: 'Contact saved successfully',
      data: savedContact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to save contact',
      error: error.message
    });
  }
});

// GET /api/contacts - Fetch all contacts sorted by latest
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: error.message
    });
  }
});

// DELETE /api/contacts/:id - Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: error.message
    });
  }
});

module.exports = router;
