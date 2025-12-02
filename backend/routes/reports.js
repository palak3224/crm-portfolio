const express = require('express');
const prisma = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all reports
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { type, status, page = 1, limit = 10 } = req.query;
    
    const where = {};
    
    if (type && type !== 'all') {
      where.type = type.toUpperCase();
    }
    
    if (status && status !== 'all') {
      where.status = status.toUpperCase();
    }

    const reports = await prisma.report.findMany({
      where,
      orderBy: { lastGenerated: 'desc' },
      skip: (page - 1) * limit,
      take: parseInt(limit)
    });

    const total = await prisma.report.count({ where });

    res.json({
      reports,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new report
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, type, description, format = 'PDF' } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: 'Name and type are required' });
    }

    const report = await prisma.report.create({
      data: {
        name,
        type: type.toUpperCase(),
        description,
        format,
        status: 'GENERATING'
      }
    });

    // Simulate report generation (in real app, this would be a background job)
    setTimeout(async () => {
      await prisma.report.update({
        where: { id: report.id },
        data: {
          status: 'READY',
          size: '2.4 MB',
          lastGenerated: new Date()
        }
      });
    }, 3000);

    res.status(201).json({
      message: 'Report generation started',
      report
    });
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Generate specific report type
router.post('/generate/:type', authenticateToken, async (req, res) => {
  try {
    const { type } = req.params;
    const { name, description } = req.body;

    const reportData = {
      CONTACT: {
        name: name || 'Contact Form Report',
        description: description || 'Comprehensive analysis of contact form submissions and conversions',
        format: 'PDF'
      },
      ANALYTICS: {
        name: name || 'Website Traffic Analysis',
        description: description || 'Detailed breakdown of website traffic, sources, and user behavior',
        format: 'PDF'
      },
      USERS: {
        name: name || 'User Engagement Report',
        description: description || 'Analysis of user interactions, session durations, and engagement metrics',
        format: 'Excel'
      },
      CONVERSION: {
        name: name || 'Conversion Funnel Report',
        description: description || 'Step-by-step analysis of the customer conversion journey',
        format: 'PDF'
      },
      PERFORMANCE: {
        name: name || 'Performance Report',
        description: description || 'Overall performance metrics and KPIs',
        format: 'PDF'
      }
    };

    const reportConfig = reportData[type.toUpperCase()];
    if (!reportConfig) {
      return res.status(400).json({ message: 'Invalid report type' });
    }

    const report = await prisma.report.create({
      data: {
        ...reportConfig,
        type: type.toUpperCase(),
        status: 'GENERATING'
      }
    });

    // Simulate report generation
    setTimeout(async () => {
      await prisma.report.update({
        where: { id: report.id },
        data: {
          status: 'READY',
          size: '2.4 MB',
          lastGenerated: new Date()
        }
      });
    }, 3000);

    res.status(201).json({
      message: `${type} report generation started`,
      report
    });
  } catch (error) {
    console.error('Generate report error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update report status
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, size } = req.body;

    const updateData = {};
    if (status) updateData.status = status.toUpperCase();
    if (size) updateData.size = size;

    const report = await prisma.report.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json({
      message: 'Report updated successfully',
      report
    });
  } catch (error) {
    console.error('Update report error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete report
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.report.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Delete report error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get report statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const total = await prisma.report.count();
    const ready = await prisma.report.count({ where: { status: 'READY' } });
    const generating = await prisma.report.count({ where: { status: 'GENERATING' } });
    const failed = await prisma.report.count({ where: { status: 'FAILED' } });

    // Get reports generated this month
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const thisMonthCount = await prisma.report.count({
      where: {
        lastGenerated: {
          gte: thisMonth
        }
      }
    });

    res.json({
      total,
      ready,
      generating,
      failed,
      thisMonth: thisMonthCount
    });
  } catch (error) {
    console.error('Get report stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
