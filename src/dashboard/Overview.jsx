import React from 'react';
import { 
  Users, 
  Mail, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  BarChart3,
  Eye,
  MousePointer,
  FileText,
  Settings
} from 'lucide-react';

const Overview = () => {
  // Mock data - replace with real data from your backend
  const stats = [
    {
      title: 'Total Contacts',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'New Messages',
      value: '89',
      change: '+8%',
      changeType: 'positive',
      icon: Mail,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Page Views',
      value: '45.2K',
      change: '+23%',
      changeType: 'positive',
      icon: Eye,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'contact',
      message: 'New contact form submission from John Doe',
      time: '2 minutes ago',
      icon: Mail,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'visit',
      message: 'High traffic spike on pricing page',
      time: '15 minutes ago',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'message',
      message: 'New chatbot conversation started',
      time: '1 hour ago',
      icon: MessageSquare,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'analytics',
      message: 'Monthly report generated',
      time: '2 hours ago',
      icon: BarChart3,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div
        className="p-8 rounded-2xl shadow-xl relative overflow-hidden"
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
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)",
            transform: "translate(50%, -50%)"
          }}
        ></div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin!</h1>
        <p className="text-gray-700 text-lg">Here's what's happening with your CRM portfolio today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' 
                    ? 'text-green-700 bg-green-100' 
                    : 'text-red-700 bg-red-100'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg bg-gray-100`}>
                    <Icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Mail className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">View Contacts</span>
            </button>
            
            <button className="p-4 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              <BarChart3 className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Analytics</span>
            </button>
            
            <button className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              <FileText className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Reports</span>
            </button>
            
            <button className="p-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Settings className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
