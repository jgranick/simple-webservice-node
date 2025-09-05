const display = require('../../../../shared/utils/display');
const logger = require('../../../../shared/utils/logger');

// Command handlers for REST client
class UserCommands {
  constructor(restClient, askQuestion) {
    this.restClient = restClient;
    this.askQuestion = askQuestion;
  }

  async listUsers() {
    console.log('\n📡 Fetching all users...');
    const result = await this.restClient.getAllUsers();
    
    if (result.success) {
      display.displayUsers(result.data);
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
    
    console.log(`\n📡 Fetching user with ID ${id}...`);
    const result = await this.restClient.getUserById(id);
    
    if (result.success) {
      display.displayUser(result.data);
    } else {
      display.error(result.message);
    }
  }

  async createUser() {
    console.log('\n📝 Creating new user...');
    
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
    const result = await this.restClient.createUser(userData);
    
    if (result.success) {
      display.success('User created successfully!', result.data);
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
    
    console.log('\n📝 Updating user (leave blank to keep current value)...');
    
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
    
    const result = await this.restClient.updateUser(id, updateData);
    
    if (result.success) {
      display.success('User updated successfully!', result.data);
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
    
    console.log(`\n📡 Deleting user with ID ${id}...`);
    const result = await this.restClient.deleteUser(id);
    
    if (result.success) {
      display.success('User deleted successfully!', result.data);
    } else {
      display.error(result.message);
    }
  }

  async healthCheck() {
    console.log('\n📡 Checking server health...');
    const result = await this.restClient.healthCheck();
    
    if (result.success) {
      display.success('Server is healthy!');
      console.log(`   Status: ${result.message}`);
      console.log(`   Timestamp: ${result.timestamp}`);
      console.log(`   Uptime: ${Math.round(result.uptime)}s`);
    } else {
      display.error(`Server health check failed: ${result.message}`);
    }
  }
}

module.exports = UserCommands;
