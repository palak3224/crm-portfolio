import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp,
  Users,
  Mail,
  BarChart3,
  PieChart,
  RefreshCw,
  Filter,
  Eye,
  Share2,
  Printer
} from 'lucide-react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('all');
  const [dateRange, setDateRange] = useState('30d');

  // Mock data - replace with real data from your backend
  const reports = [
    {
      id: 1,
      name: 'Monthly Contact Form Report',
      type: 'contact',
      description: 'Comprehensive analysis of contact form submissions and conversions',
      lastGenerated: '2024-01-15T10:30:00Z',
      status: 'ready',
      size: '2.4 MB',
      format: 'PDF'
    },
    {
      id: 2,
      name: 'Website Traffic Analysis',
      type: 'analytics',
      description: 'Detailed breakdown of website traffic, sources, and user behavior',
      lastGenerated: '2024-01-14T14:20:00Z',
      status: 'ready',
      size: '1.8 MB',
      format: 'PDF'
    },
    {
      id: 3,
      name: 'User Engagement Report',
      type: 'users',
      description: 'Analysis of user interactions, session durations, and engagement metrics',
      lastGenerated: '2024-01-13T09:15:00Z',
      status: 'ready',
      size: '3.1 MB',
      format: 'Excel'
    },
    {
      id: 4,
      name: 'Conversion Funnel Report',
      type: 'conversion',
      description: 'Step-by-step analysis of the customer conversion journey',
      lastGenerated: '2024-01-12T16:45:00Z',
      status: 'generating',
      size: '1.2 MB',
      format: 'PDF'
    },
    {
      id: 5,
      name: 'Weekly Performance Summary',
      type: 'performance',
      description: 'Weekly overview of key performance indicators and metrics',
      lastGenerated: '2024-01-11T11:30:00Z',
      status: 'ready',
      size: '0.8 MB',
      format: 'PDF'
    }
  ];

  const reportTypes = [
    { value: 'all', label: 'All Reports', icon: FileText, color: 'from-gray-500 to-gray-600' },
    { value: 'contact', label: 'Contact Reports', icon: Mail, color: 'from-blue-500 to-blue-600' },
    { value: 'analytics', label: 'Analytics Reports', icon: BarChart3, color: 'from-green-500 to-green-600' },
    { value: 'users', label: 'User Reports', icon: Users, color: 'from-purple-500 to-purple-600' },
    { value: 'conversion', label: 'Conversion Reports', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
    { value: 'performance', label: 'Performance Reports', icon: PieChart, color: 'from-red-500 to-red-600' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'generating':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ready':
        return <FileText className="w-4 h-4 text-green-600" />;
      case 'generating':
        return <RefreshCw className="w-4 h-4 text-yellow-600 animate-spin" />;
      case 'failed':
        return <FileText className="w-4 h-4 text-red-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredReports = reports.filter(report => 
    selectedReport === 'all' || report.type === selectedReport
  );

  const handleGenerateReport = (reportType) => {
    // Add logic to generate new report
    console.log(`Generating ${reportType} report...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and manage detailed reports for your CRM portfolio</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Date Range Selector */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          
          {/* Generate Report Button */}
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            <FileText className="w-4 h-4 inline mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Report Type Filters */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {reportTypes.map((type) => {
          const Icon = type.icon;
          const isActive = selectedReport === type.value;
          
          return (
            <button
              key={type.value}
              onClick={() => setSelectedReport(type.value)}
              className={`p-4 rounded-2xl transition-all duration-200 ${
                isActive
                  ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                  : 'bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">{type.label}</span>
            </button>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{reports.length}</span>
          </div>
          <h3 className="text-gray-600 text-sm">Total Reports</h3>
        </div>
        
        <div className="p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
              <Download className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {reports.filter(r => r.status === 'ready').length}
            </span>
          </div>
          <h3 className="text-gray-600 text-sm">Ready to Download</h3>
        </div>
        
        <div className="p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">24</span>
          </div>
          <h3 className="text-gray-600 text-sm">Generated This Month</h3>
        </div>
        
        <div className="p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">+18%</span>
          </div>
          <h3 className="text-gray-600 text-sm">Report Usage Growth</h3>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        <div className="p-6 border-b border-gray-200/50">
          <h2 className="text-xl font-bold text-gray-900">Recent Reports</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/80 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Report</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Size</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Last Generated</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{report.name}</div>
                      <div className="text-sm text-gray-600 max-w-xs truncate">{report.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                      {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(report.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{report.size}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{formatDate(report.lastGenerated)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {report.status === 'ready' && (
                        <>
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <Printer className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {report.status === 'generating' && (
                        <span className="text-sm text-yellow-600">Generating...</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">Try adjusting your filter criteria or generate a new report.</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          onClick={() => handleGenerateReport('contact')}
          className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
        >
          <Mail className="w-8 h-8 mx-auto mb-3" />
          <h3 className="font-bold mb-2">Contact Report</h3>
          <p className="text-sm opacity-90">Generate contact form analytics</p>
        </button>
        
        <button
          onClick={() => handleGenerateReport('analytics')}
          className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300"
        >
          <BarChart3 className="w-8 h-8 mx-auto mb-3" />
          <h3 className="font-bold mb-2">Analytics Report</h3>
          <p className="text-sm opacity-90">Website traffic analysis</p>
        </button>
        
        <button
          onClick={() => handleGenerateReport('conversion')}
          className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-300"
        >
          <TrendingUp className="w-8 h-8 mx-auto mb-3" />
          <h3 className="font-bold mb-2">Conversion Report</h3>
          <p className="text-sm opacity-90">Conversion funnel analysis</p>
        </button>
        
        <button
          onClick={() => handleGenerateReport('performance')}
          className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
        >
          <PieChart className="w-8 h-8 mx-auto mb-3" />
          <h3 className="font-bold mb-2">Performance Report</h3>
          <p className="text-sm opacity-90">Overall performance metrics</p>
        </button>
      </div>
    </div>
  );
};

export default Reports;
