import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Eye,
  Trash2,
  Reply,
  Star,
  Clock,
  XCircle,
  X,
  FileSpreadsheet,
  CheckCircle,
  MessageCircle
} from 'lucide-react';
import { contactsAPI } from './utils/api';

const ContactForms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch contacts data
  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: pagination.page,
        limit: pagination.limit
      };
      
      if (searchTerm) params.search = searchTerm;
      if (filterStatus !== 'all') params.status = filterStatus;
      
      const response = await contactsAPI.getAll(params);
      setContacts(response.contacts);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError(error.message);
      // Fallback to empty array if API fails
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch contact statistics
  const fetchStats = async () => {
    try {
      const response = await contactsAPI.getStats();
      setStats(response);
    } catch (error) {
      console.error('Error fetching contact stats:', error);
      // Keep default stats if API fails
    }
  };

  // Load data on component mount and when filters change
  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, [pagination.page, searchTerm, filterStatus]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'qualified':
        return 'bg-green-100 text-green-800';
      case 'converted':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactsAPI.delete(contactId);
        fetchContacts(); // Refresh the list
        fetchStats(); // Refresh stats
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Failed to delete contact: ' + error.message);
      }
    }
  };

  const handleUpdateStatus = async (contactId, newStatus) => {
    try {
      await contactsAPI.update(contactId, { status: newStatus });
      fetchContacts(); // Refresh the list
      fetchStats(); // Refresh stats
    } catch (error) {
      console.error('Error updating contact status:', error);
      alert('Failed to update contact status: ' + error.message);
    }
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  const handleExportToExcel = async () => {
    try {
      // Fetch all contacts for export (without pagination)
      const response = await contactsAPI.getAll({ page: 1, limit: 1000 });
      const allContacts = response.contacts;
      
      // Create CSV content
      const headers = ['ID', 'Name', 'Email', 'Phone', 'Message', 'Status', 'Source', 'Created At'];
      const csvContent = [
        headers.join(','),
        ...allContacts.map(contact => [
          contact.id,
          `"${contact.name}"`,
          `"${contact.email}"`,
          `"${contact.phone || ''}"`,
          `"${contact.message.replace(/"/g, '""')}"`, // Escape quotes in message
          contact.status,
          contact.source || 'Contact Form',
          new Date(contact.createdAt).toLocaleString()
        ].join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `contacts_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting contacts:', error);
      alert('Failed to export contacts: ' + error.message);
    }
  };

  const handleSelectContact = (contactId) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map(contact => contact.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Form Submissions</h1>
          <p className="text-gray-600 mt-2">Manage and track all contact form submissions from your website</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleExportToExcel}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FileSpreadsheet className="w-4 h-4 inline mr-2" />
            Export to Excel
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.total}</span>
          </div>
          <h3 className="text-gray-600 text-sm">Total Contacts</h3>
        </div>
        
        <div className="p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.new}</span>
          </div>
          <h3 className="text-gray-600 text-sm">New</h3>
        </div>
        
        <div className="p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600">
              <Reply className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.contacted}</span>
          </div>
          <h3 className="text-gray-600 text-sm">Contacted</h3>
        </div>
        
        <div className="p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
              <Star className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.qualified}</span>
          </div>
          <h3 className="text-gray-600 text-sm">Qualified</h3>
        </div>
        
        <div className="p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.converted}</span>
          </div>
          <h3 className="text-gray-600 text-sm">Converted</h3>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search contacts by name, email, or message..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
              />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="lg:w-48">
            <select
              value={filterStatus}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
            </select>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
              }}
              className="px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedContacts.length === contacts.length && contacts.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact Information</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Message Preview</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Submitted</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading contacts...</p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-red-600">
                      <XCircle className="w-12 h-12 mx-auto mb-4" />
                      <p className="text-lg font-medium">Error loading contacts</p>
                      <p className="text-sm">{error}</p>
                    </div>
                  </td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => handleSelectContact(contact.id)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                          {contact.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 truncate">{contact.name}</div>
                          <div className="text-sm text-gray-600 truncate">{contact.email}</div>
                          {contact.phone && (
                            <div className="text-sm text-gray-500 truncate flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {contact.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-900 line-clamp-3 leading-relaxed">
                          {contact.message}
                        </p>
                        <button 
                          onClick={() => handleViewContact(contact)}
                          className="text-xs text-purple-600 hover:text-purple-800 mt-1 font-medium"
                        >
                          Read full message →
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                        {contact.status?.charAt(0).toUpperCase() + contact.status?.slice(1) || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">{formatDate(contact.createdAt).split(' ')[0]}</div>
                        <div className="text-gray-500">{formatDate(contact.createdAt).split(' ')[1]}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <button 
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          title="View full details"
                          onClick={() => handleViewContact(contact)}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                          title="Mark as contacted"
                          onClick={() => handleUpdateStatus(contact.id, 'CONTACTED')}
                        >
                          <Reply className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Delete contact"
                          onClick={() => handleDeleteContact(contact.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/80">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} contacts
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                  disabled={pagination.page === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm text-gray-600">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.min(pagination.pages, prev.page + 1) }))}
                  disabled={pagination.page === pagination.pages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selected Actions */}
      {selectedContacts.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-200/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                {selectedContacts.length}
              </div>
              <span className="text-gray-700 font-medium">
                {selectedContacts.length} contact{selectedContacts.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => {
                  selectedContacts.forEach(id => handleUpdateStatus(id, 'CONTACTED'));
                  setSelectedContacts([]);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Reply className="w-4 h-4" />
                Mark as Contacted
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Selected
              </button>
              <button 
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete ${selectedContacts.length} contact(s)?`)) {
                    selectedContacts.forEach(id => handleDeleteContact(id));
                    setSelectedContacts([]);
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Details Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto border border-gray-200"
            style={{
              background: `
                linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)
              `,
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {selectedContact.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Contact Details</h2>
                    <p className="text-gray-600 mt-1">Submitted on {formatDate(selectedContact.createdAt)}</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-3 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Basic Info Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Name Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{selectedContact.name?.charAt(0).toUpperCase() || 'U'}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-blue-700 uppercase tracking-wide">Full Name</h3>
                      </div>
                    </div>
                    <p className="text-xl font-semibold text-gray-900">{selectedContact.name}</p>
                  </div>

                  {/* Email Card */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-green-700 uppercase tracking-wide">Email Address</h3>
                      </div>
                    </div>
                    <a 
                      href={`mailto:${selectedContact.email}`}
                      className="text-xl font-semibold text-gray-900 hover:text-green-600 transition-colors"
                    >
                      {selectedContact.email}
                    </a>
                  </div>

                  {/* Phone Card */}
                  {selectedContact.phone && (
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-purple-700 uppercase tracking-wide">Phone Number</h3>
                        </div>
                      </div>
                      <a 
                        href={`tel:${selectedContact.phone}`}
                        className="text-xl font-semibold text-gray-900 hover:text-purple-600 transition-colors"
                      >
                        {selectedContact.phone}
                      </a>
                    </div>
                  )}

                  {/* Status Card */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-orange-700 uppercase tracking-wide">Status</h3>
                      </div>
                    </div>
                    <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-xl ${getStatusColor(selectedContact.status)}`}>
                      {selectedContact.status?.charAt(0).toUpperCase() + selectedContact.status?.slice(1) || 'Unknown'}
                    </span>
                  </div>
                </div>

                {/* Message Section */}
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-600 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Message</h3>
                      <p className="text-sm text-gray-600">Full message content from the contact</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm max-h-96 overflow-y-auto">
                    <p className="text-gray-900 whitespace-pre-wrap leading-relaxed text-base break-words overflow-wrap-anywhere">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-indigo-700 uppercase tracking-wide">Source</h3>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{selectedContact.source || 'Contact Form'}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-teal-700 uppercase tracking-wide">Submission Date</h3>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{formatDate(selectedContact.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => window.open(`mailto:${selectedContact.email}`, '_blank')}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Mail className="w-5 h-5" />
                    Send Email
                  </button>
                  {selectedContact.phone && (
                    <button
                      onClick={() => window.open(`tel:${selectedContact.phone}`, '_self')}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Phone className="w-5 h-5" />
                      Call
                    </button>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedContact.id, 'CONTACTED')}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Mark as Contacted
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForms;
