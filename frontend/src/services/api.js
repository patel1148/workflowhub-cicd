/**
 * API Service for WorkFlowHub
 * Configured using environment variables with automatic token injection.
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (includeAuth) {
      const token = localStorage.getItem('workflowhub_token');
      if (token) {
        headers['Authorization'] = `Token ${token}`;
      }
    }
    return headers;
  }

  async handleResponse(response) {
    if (response.status === 204) {
      return null;
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const errorMsg = data.detail || data.error || (data && Object.values(data).flat().join(', ')) || 'Request failed';
      throw new Error(errorMsg);
    }
    return data;
  }

  // Health check
  async checkHealth() {
    const res = await fetch(`${this.baseUrl}/health/`);
    return this.handleResponse(res);
  }

  // Authentication
  async register(username, email, password, passwordConfirm) {
    const res = await fetch(`${this.baseUrl}/auth/register/`, {
      method: 'POST',
      headers: this.getHeaders(false),
      body: JSON.stringify({
        username,
        email,
        password,
        password_confirm: passwordConfirm,
      }),
    });
    return this.handleResponse(res);
  }

  async login(username, password) {
    const res = await fetch(`${this.baseUrl}/auth/login/`, {
      method: 'POST',
      headers: this.getHeaders(false),
      body: JSON.stringify({ username, password }),
    });
    return this.handleResponse(res);
  }

  async logout() {
    try {
      await fetch(`${this.baseUrl}/auth/logout/`, {
        method: 'POST',
        headers: this.getHeaders(true),
      });
    } finally {
      localStorage.removeItem('workflowhub_token');
      localStorage.removeItem('workflowhub_user');
    }
  }

  async getCurrentUser() {
    const res = await fetch(`${this.baseUrl}/auth/me/`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });
    return this.handleResponse(res);
  }

  // Workflow Items CRUD
  async getWorkflows(statusFilter = null, searchTerm = null) {
    let url = `${this.baseUrl}/workflows/`;
    const params = new URLSearchParams();
    if (statusFilter && statusFilter !== 'All') {
      params.append('status', statusFilter);
    }
    if (searchTerm) {
      params.append('search', searchTerm);
    }
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    const res = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(true),
    });
    const data = await this.handleResponse(res);
    // Handle paginated or non-paginated responses
    return data.results ? data.results : data;
  }

  async createWorkflow(title, description, status = 'Pending') {
    const res = await fetch(`${this.baseUrl}/workflows/`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify({ title, description, status }),
    });
    return this.handleResponse(res);
  }

  async updateWorkflow(id, updates) {
    const res = await fetch(`${this.baseUrl}/workflows/${id}/`, {
      method: 'PATCH',
      headers: this.getHeaders(true),
      body: JSON.stringify(updates),
    });
    return this.handleResponse(res);
  }

  async deleteWorkflow(id) {
    const res = await fetch(`${this.baseUrl}/workflows/${id}/`, {
      method: 'DELETE',
      headers: this.getHeaders(true),
    });
    return this.handleResponse(res);
  }
}

export const apiService = new ApiService();
export default apiService;

