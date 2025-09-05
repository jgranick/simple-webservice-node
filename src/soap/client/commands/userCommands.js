const display = require('../../../../shared/utils/display');
const logger = require('../../../../shared/utils/logger');

// Command handlers for SOAP client
class UserCommands {
  constructor(soapClient, askQuestion) {
    this.soapClient = soapClient;
    this.askQuestion = askQuestion;
  }

  async listUsers() {
    console.log('\n📡 Fetching all users via SOAP...');
    const result = await this.soapClient.getAllUsers();
    
    if (result.success) {
      const users = result.data.users.user || [];
      const count = result.data.count;
      console.log(`Found ${count} users:`);
      display.displayUsers(users);
    } else {
      display.error(result.message);
    }
  }

  async getUserById() {
    const id = await this.askQuestion('Enter user ID: ');
    
    if (!id || isNaN(id)) {
      display.error('Invalid ID');
      return;
    }
    
    console.log(`\n📡 Fetching user with ID ${id} via SOAP...`);
    const result = await this.soapClient.getUserById(id);
    
    if (result.success) {
      display.displayUser(result.data.user);
    } else {
      display.error(result.message);
    }
  }

  async createUser() {
    console.log('\n📝 Creating new user via SOAP...');
    
    const name = await this.askQuestion('Enter name: ');
    const email = await this.askQuestion('Enter email: ');
    const age = await this.askQuestion('Enter age: ');
    
    if (!name || !email || !age) {
      display.error('All fields are required');
      return;
    }
    
    if (isNaN(age)) {
      display.error('Age must be a number');
      return;
    }
    
    const userData = { name, email, age: parseInt(age) };
    const result = await this.soapClient.createUser(userData);
    
    if (result.success) {
      display.success('User created successfully!', result.data.user);
      console.log(`   Message: ${result.data.message}`);
    } else {
      display.error(result.message);
    }
  }

  async updateUser() {
    const id = await this.askQuestion('Enter user ID to update: ');
    
    if (!id || isNaN(id)) {
      display.error('Invalid ID');
      return;
    }
    
    console.log('\n📝 Updating user via SOAP (leave blank to keep current value)...');
    
    const name = await this.askQuestion('Enter new name: ');
    const email = await this.askQuestion('Enter new email: ');
    const age = await this.askQuestion('Enter new age: ');
    
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (age) {
      if (isNaN(age)) {
        display.error('Age must be a number');
        return;
      }
      updateData.age = parseInt(age);
    }
    
    if (Object.keys(updateData).length === 0) {
      display.error('No changes provided');
      return;
    }
    
    const result = await this.soapClient.updateUser(id, updateData);
    
    if (result.success) {
      display.success('User updated successfully!', result.data.user);
      console.log(`   Message: ${result.data.message}`);
    } else {
      display.error(result.message);
    }
  }

  async deleteUser() {
    const id = await this.askQuestion('Enter user ID to delete: ');
    
    if (!id || isNaN(id)) {
      display.error('Invalid ID');
      return;
    }
    
    const confirm = await this.askQuestion(`Are you sure you want to delete user ${id}? (y/N): `);
    
    if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
      display.error('Deletion cancelled');
      return;
    }
    
    console.log(`\n📡 Deleting user with ID ${id} via SOAP...`);
    const result = await this.soapClient.deleteUser(id);
    
    if (result.success) {
      display.success('User deleted successfully!', result.data.user);
      console.log(`   Message: ${result.data.message}`);
    } else {
      display.error(result.message);
    }
  }

  async healthCheck() {
    console.log('\n📡 Checking SOAP server health...');
    const result = await this.soapClient.healthCheck();
    
    if (result.success) {
      display.success('SOAP Server is healthy!');
      console.log(`   Status: ${result.data.message}`);
      console.log(`   Timestamp: ${result.data.timestamp}`);
      console.log(`   Uptime: ${Math.round(result.data.uptime)}s`);
    } else {
      display.error(`SOAP Server health check failed: ${result.message}`);
    }
  }

  async showWSDL() {
    console.log('\n📄 WSDL Information:');
    console.log(`   WSDL URL: ${this.soapClient.wsdlUrl}`);
    console.log(`   Service Name: UserService`);
    console.log(`   Target Namespace: http://localhost:3001/UserService`);
    console.log('\n🔧 Available Operations:');
    console.log('   - getAllUsers()');
    console.log('   - getUser(id)');
    console.log('   - createUser(name, email, age)');
    console.log('   - updateUser(id, name?, email?, age?)');
    console.log('   - deleteUser(id)');
    console.log('   - health()');
    
    const wsdlInfo = this.soapClient.getWSDLInfo();
    if (wsdlInfo) {
      console.log('\n📋 Service Details:');
      console.log(`   Service: ${wsdlInfo.serviceName}`);
      console.log(`   Port: ${wsdlInfo.portName}`);
      console.log(`   Binding: ${wsdlInfo.bindingName}`);
    }
  }
}

module.exports = UserCommands;
