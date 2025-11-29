const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
  async getFormSchema() {
    const response = await fetch(`${API_BASE_URL}/form-schema`);
    if (!response.ok) {
      throw new Error('Failed to fetch form schema');
    }
    return response.json();
  },

  async submitForm(data) {
    const response = await fetch(`${API_BASE_URL}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const json = await response.json();
    
    if (!response.ok) {
      throw json;
    }
    
    return json;
  },

  async getSubmissions({ page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', search = '' }) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder,
      ...(search && { search })
    });
    
    const response = await fetch(`${API_BASE_URL}/submissions?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch submissions');
    }
    
    return response.json();
  },

  async getSubmissionById(id) {
    const response = await fetch(`${API_BASE_URL}/submissions/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch submission');
    }
    
    return response.json();
  },

  async updateSubmission(id, data) {
    const response = await fetch(`${API_BASE_URL}/submissions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const json = await response.json();
    
    if (!response.ok) {
      throw json;
    }
    
    return json;
  },

  async deleteSubmission(id) {
    const response = await fetch(`${API_BASE_URL}/submissions/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete submission');
    }
    
    return response.json();
  },
};