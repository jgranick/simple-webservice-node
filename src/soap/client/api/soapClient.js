const soap = require('soap');
const { SOAP_PORT } = require('../../../../config/ports');

const WSDL_URL = `http://localhost:${SOAP_PORT}/wsdl`;

// SOAP API client
class SoapClient {
  constructor() {
    this.wsdlUrl = WSDL_URL;
    this.client = null;
  }

  // Initialize SOAP client
  async initializeClient() {
    try {
      console.log('📡 Connecting to SOAP service...');
      this.client = await soap.createClientAsync(this.wsdlUrl);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Helper function to make SOAP requests
  async makeSoapRequest(methodName, args = {}) {
    try {
      const result = await this.client[methodName + 'Async'](args);
      return { success: true, data: result };
    } catch (error) {
      if (error.Fault) {
        return { success: false, message: error.Fault.faultstring };
      }
      return { success: false, message: 'SOAP Error: ' + error.message };
    }
  }

  // API methods
  async getAllUsers() {
    return await this.makeSoapRequest('getAllUsers');
  }

  async getUserById(id) {
    return await this.makeSoapRequest('getUser', { id: parseInt(id) });
  }

  async createUser(userData) {
    return await this.makeSoapRequest('createUser', userData);
  }

  async updateUser(id, updateData) {
    return await this.makeSoapRequest('updateUser', { id: parseInt(id), ...updateData });
  }

  async deleteUser(id) {
    return await this.makeSoapRequest('deleteUser', { id: parseInt(id) });
  }

  async healthCheck() {
    return await this.makeSoapRequest('health');
  }

  // Get WSDL information
  getWSDLInfo() {
    if (!this.client || !this.client.wsdl) {
      return null;
    }
    
    return {
      serviceName: this.client.wsdl.definitions.services.UserService.name,
      portName: this.client.wsdl.definitions.services.UserService.ports.UserServicePort.name,
      bindingName: this.client.wsdl.definitions.bindings.UserServiceBinding.name
    };
  }
}

module.exports = SoapClient;
