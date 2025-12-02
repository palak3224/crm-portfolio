const express = require('express');
const prisma = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get analytics overview
router.get('/overview', authenticateToken, async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    let dateFilter = new Date();
    switch (period) {
      case '7d':
        dateFilter.setDate(dateFilter.getDate() - 7);
        break;
      case '30d':
        dateFilter.setDate(dateFilter.getDate() - 30);
        break;
      case '90d':
        dateFilter.setDate(dateFilter.getDate() - 90);
        break;
      default:
        dateFilter.setDate(dateFilter.getDate() - 30);
    }

    // Get latest analytics data
    const latestAnalytics = await prisma.analytics.findFirst({
      orderBy: { date: 'desc' }
    });

    // Get page views
    const pageViews = await prisma.pageView.findMany({
      orderBy: { views: 'desc' }
    });

    // Get traffic sources
    const trafficSources = await prisma.trafficSource.findMany({
      orderBy: { visitors: 'desc' }
    });

    res.json({
      overview: latestAnalytics || {
        pageViews: 0,
        uniqueVisitors: 0,
        bounceRate: 0,
        sessionDuration: 0
      },
      topPages: pageViews,
      trafficSources: trafficSources
    });
  } catch (error) {
    console.error('Get analytics overview error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update analytics data
router.post('/update', authenticateToken, async (req, res) => {
  try {
    const { pageViews, uniqueVisitors, bounceRate, sessionDuration } = req.body;

    const analytics = await prisma.analytics.create({
      data: {
        pageViews: pageViews || 0,
        uniqueVisitors: uniqueVisitors || 0,
        bounceRate: bounceRate || 0,
        sessionDuration: sessionDuration || 0
      }
    });

    res.json({
      message: 'Analytics data updated successfully',
      analytics
    });
  } catch (error) {
    console.error('Update analytics error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Track page view
router.post('/pageview', async (req, res) => {
  try {
    const { page } = req.body;

    if (!page) {
      return res.status(400).json({ message: 'Page is required' });
    }

    const pageView = await prisma.pageView.upsert({
      where: { page },
      update: { views: { increment: 1 } },
      create: { page, views: 1 }
    });

    res.json({
      message: 'Page view tracked successfully',
      pageView
    });
  } catch (error) {
    console.error('Track page view error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Track traffic source
router.post('/traffic-source', async (req, res) => {
  try {
    const { source } = req.body;

    if (!source) {
      return res.status(400).json({ message: 'Source is required' });
    }

    const trafficSource = await prisma.trafficSource.upsert({
      where: { source },
      update: { visitors: { increment: 1 } },
      create: { source, visitors: 1 }
    });

    res.json({
      message: 'Traffic source tracked successfully',
      trafficSource
    });
  } catch (error) {
    console.error('Track traffic source error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
