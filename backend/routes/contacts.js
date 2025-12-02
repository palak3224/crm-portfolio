const express = require('express');
const prisma = require('../config/database');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all contacts
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    
    const where = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (status && status !== 'all') {
      where.status = status.toUpperCase();
    }

    const contacts = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: parseInt(limit)
    });

    const total = await prisma.contact.count({ where });

    res.json({
      contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, source = 'Contact Form' } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        message,
        source,
        status: 'NEW'
      }
    });

    res.status(201).json({
      message: 'Contact form submitted successfully',
      contact
    });
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update contact status
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const contact = await prisma.contact.update({
      where: { id: parseInt(id) },
      data: { status: status.toUpperCase() }
    });

    res.json({
      message: 'Contact status updated successfully',
      contact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete contact
router.delete('/:id', authenticateToken, requireRole(['ADMIN', 'MANAGER']), async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.contact.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get contact statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const total = await prisma.contact.count();
    const newCount = await prisma.contact.count({ where: { status: 'NEW' } });
    const contactedCount = await prisma.contact.count({ where: { status: 'CONTACTED' } });
    const qualifiedCount = await prisma.contact.count({ where: { status: 'QUALIFIED' } });
    const convertedCount = await prisma.contact.count({ where: { status: 'CONVERTED' } });

    res.json({
      total,
      new: newCount,
      contacted: contactedCount,
      qualified: qualifiedCount,
      converted: convertedCount
    });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
