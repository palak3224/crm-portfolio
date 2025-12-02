const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5703'}/api`;

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: getAuthHeaders(),
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  login: (email, password) => 
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  
  verify: () => 
    apiCall('/auth/verify'),
  
  register: (userData) => 
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
};

// Contacts API calls
export const contactsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/contacts${queryString ? `?${queryString}` : ''}`);
  },
  
  create: (contactData) => 
    apiCall('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    }),
  
  update: (id, data) => 
    apiCall(`/contacts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  delete: (id) => 
    apiCall(`/contacts/${id}`, {
      method: 'DELETE',
    }),
  
  getStats: () => 
    apiCall('/contacts/stats'),
};

// Analytics API calls
export const analyticsAPI = {
  getOverview: (period = '30d') => 
    apiCall(`/analytics/overview?period=${period}`),
  
  update: (data) => 
    apiCall('/analytics/update', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  trackPageView: (page) => 
    apiCall('/analytics/pageview', {
      method: 'POST',
      body: JSON.stringify({ page }),
    }),
  
  trackTrafficSource: (source) => 
    apiCall('/analytics/traffic-source', {
      method: 'POST',
      body: JSON.stringify({ source }),
    }),
};

// Users API calls
export const usersAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/users${queryString ? `?${queryString}` : ''}`);
  },
  
  create: (userData) => 
    apiCall('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  update: (id, data) => 
    apiCall(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  delete: (id) => 
    apiCall(`/users/${id}`, {
      method: 'DELETE',
    }),
  
  getStats: () => 
    apiCall('/users/stats'),
};

// Reports API calls
export const reportsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/reports${queryString ? `?${queryString}` : ''}`);
  },
  
  create: (reportData) => 
    apiCall('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    }),
  
  generate: (type, data = {}) => 
    apiCall(`/reports/generate/${type}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (id, data) => 
    apiCall(`/reports/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  delete: (id) => 
    apiCall(`/reports/${id}`, {
      method: 'DELETE',
    }),
  
  getStats: () => 
    apiCall('/reports/stats'),
};

export default {
  authAPI,
  contactsAPI,
  analyticsAPI,
  usersAPI,
  reportsAPI,
};
