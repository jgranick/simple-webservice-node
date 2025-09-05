const axios = require('axios');
const { REST_PORT } = require('../../../../config/ports');

const API_BASE_URL = `http://localhost:${REST_PORT}/api`;

// REST API client
class RestClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper function to make API requests
  async makeRequest(method, endpoint, data = null) {
    try {
      const config = {
        method,
        url: `${this.baseURL}${endpoint}`,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      if (data) {
        config.data = data;
      }
      
      const response = await axios(config);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
      return { success: false, message: 'Network error: ' + error.message };
    }
  }

  // API methods
  async getAllUsers() {
    return await this.makeRequest('GET', '/users');
  }

  async getUserById(id) {
    return await this.makeRequest('GET', `/users/${id}`);
  }

  async createUser(userData) {
    return await this.makeRequest('POST', '/users', userData);
  }

  async updateUser(id, updateData) {
    return await this.makeRequest('PUT', `/users/${id}`, updateData);
  }

  async deleteUser(id) {
    return await this.makeRequest('DELETE', `/users/${id}`);
  }

  async healthCheck() {
    return await this.makeRequest('GET', '/health');
  }
}

module.exports = RestClient;
