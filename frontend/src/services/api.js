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

  async getSubmissions({ page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' }) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder,
    });
    
    const response = await fetch(`${API_BASE_URL}/submissions?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch submissions');
    }
    
    return response.json();
  },
};