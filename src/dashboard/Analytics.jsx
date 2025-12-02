import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  Download,
  RefreshCw,
  Settings,
  ExternalLink
} from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data - replace with real Google Analytics data
  const analyticsData = {
    overview: {
      pageViews: { value: '45,234', change: '+12.5%', trend: 'up' },
      uniqueVisitors: { value: '23,891', change: '+8.3%', trend: 'up' },
      bounceRate: { value: '34.2%', change: '-2.1%', trend: 'down' },
      avgSessionDuration: { value: '3m 42s', change: '+15.2%', trend: 'up' }
    },
    topPages: [
      { page: '/', views: 12450, percentage: 27.5 },
      { page: '/services', views: 8930, percentage: 19.7 },
      { page: '/contact', views: 6780, percentage: 15.0 },
      { page: '/pricing', views: 5420, percentage: 12.0 },
      { page: '/about', views: 3890, percentage: 8.6 }
    ],
    trafficSources: [
      { source: 'Direct', visitors: 12500, percentage: 52.3, color: 'from-blue-500 to-blue-600' },
      { source: 'Google Search', visitors: 8900, percentage: 37.2, color: 'from-green-500 to-green-600' },
      { source: 'Social Media', visitors: 1890, percentage: 7.9, color: 'from-purple-500 to-purple-600' },
      { source: 'Referrals', visitors: 601, percentage: 2.5, color: 'from-orange-500 to-orange-600' }
    ],
    deviceBreakdown: [
      { device: 'Desktop', visitors: 14300, percentage: 59.8, icon: Monitor },
      { device: 'Mobile', visitors: 7890, percentage: 33.0, icon: Smartphone },
      { device: 'Tablet', visitors: 1701, percentage: 7.1, icon: Smartphone }
    ],
    recentActivity: [
      { time: '2 min ago', event: 'High traffic spike on pricing page', type: 'traffic' },
      { time: '15 min ago', event: 'New visitor from Google Search', type: 'visit' },
      { time: '1 hour ago', event: 'Contact form submission', type: 'conversion' },
      { time: '2 hours ago', event: 'User downloaded pricing PDF', type: 'engagement' }
    ]
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
    <div className="p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center text-sm font-medium px-2 py-1 rounded-full ${
          trend === 'up' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
        }`}>
          <TrendingUp className={`w-3 h-3 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
          {change}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Google Analytics integration and website performance metrics</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          
          {/* Google Analytics Link */}
          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Google Analytics
          </a>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Page Views"
          value={analyticsData.overview.pageViews.value}
          change={analyticsData.overview.pageViews.change}
          trend={analyticsData.overview.pageViews.trend}
          icon={Eye}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Unique Visitors"
          value={analyticsData.overview.uniqueVisitors.value}
          change={analyticsData.overview.uniqueVisitors.change}
          trend={analyticsData.overview.uniqueVisitors.trend}
          icon={Users}
          color="from-green-500 to-green-600"
        />
        <StatCard
          title="Bounce Rate"
          value={analyticsData.overview.bounceRate.value}
          change={analyticsData.overview.bounceRate.change}
          trend={analyticsData.overview.bounceRate.trend}
          icon={MousePointer}
          color="from-orange-500 to-orange-600"
        />
        <StatCard
          title="Avg. Session Duration"
          value={analyticsData.overview.avgSessionDuration.value}
          change={analyticsData.overview.avgSessionDuration.change}
          trend={analyticsData.overview.avgSessionDuration.trend}
          icon={Calendar}
          color="from-purple-500 to-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top Pages</h2>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {analyticsData.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{page.page}</p>
                    <p className="text-sm text-gray-600">{page.views.toLocaleString()} views</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{page.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Traffic Sources</h2>
            <Globe className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {analyticsData.trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${source.color}`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{source.source}</p>
                    <p className="text-sm text-gray-600">{source.visitors.toLocaleString()} visitors</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{source.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Breakdown */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Device Breakdown</h2>
          
          <div className="space-y-4">
            {analyticsData.deviceBreakdown.map((device, index) => {
              const Icon = device.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <Icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{device.device}</p>
                      <p className="text-sm text-gray-600">{device.visitors.toLocaleString()} visitors</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{device.percentage}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {analyticsData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium">{activity.event}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Google Analytics Integration Info */}
      <div
        className="p-6 rounded-2xl shadow-xl relative overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(135, 206, 235, 0.4) 0%, 
              rgba(70, 130, 180, 0.3) 50%, 
              rgba(30, 144, 255, 0.2) 100%
            )
          `,
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Google Analytics Integration</h3>
            <p className="text-gray-700">
              Connect your Google Analytics account to view real-time data and advanced metrics.
            </p>
          </div>
          <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-gray-900 rounded-lg hover:bg-white/30 transition-all duration-300 border border-gray-300/50">
            <Settings className="w-5 h-5 mr-2 inline" />
            Configure
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
