const readline = require('readline');
const RestClient = require('./api/restClient');
const UserCommands = require('./commands/userCommands');
const display = require('../../../shared/utils/display');
const logger = require('../../../shared/utils/logger');
const { REST_PORT } = require('../../../config/ports');

// REST Client Application
class RestClientApp {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    this.restClient = new RestClient();
    this.userCommands = new UserCommands(this.restClient, this.askQuestion.bind(this));
  }

  // Helper function to ask questions
  askQuestion(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  // Initialize client connection
  async initializeClient() {
    try {
      console.log('📡 Connecting to REST service...');
      const healthResult = await this.restClient.healthCheck();
      if (!healthResult.success) {
        logger.clientConnectionError('REST', REST_PORT, 'npm start');
        return false;
      }
      
      logger.clientConnected('REST', `http://localhost:${REST_PORT}`);
      return true;
    } catch (error) {
      logger.clientConnectionError('REST', REST_PORT, 'npm start');
      return false;
    }
  }

  // Main application loop
  async run() {
    console.log('🌐 Terminal User Management Client');
    console.log(`Connecting to REST service at http://localhost:${REST_PORT}`);
    
    // Initialize client
    const connected = await this.initializeClient();
    if (!connected) {
      process.exit(1);
    }
    
    while (true) {
      display.displayRestMenu();
      const choice = await this.askQuestion('Enter your choice: ');
      
      switch (choice) {
        case '1':
          await this.userCommands.listUsers();
          break;
        case '2':
          await this.userCommands.getUserById();
          break;
        case '3':
          await this.userCommands.createUser();
          break;
        case '4':
          await this.userCommands.updateUser();
          break;
        case '5':
          await this.userCommands.deleteUser();
          break;
        case '6':
          await this.userCommands.healthCheck();
          break;
        case '0':
          console.log('\n👋 Goodbye!');
          this.rl.close();
          process.exit(0);
          break;
        default:
          display.error('Invalid choice. Please try again.');
      }
      
      await this.askQuestion('\nPress Enter to continue...');
    }
  }

  // Handle Ctrl+C gracefully
  setupGracefulShutdown() {
    process.on('SIGINT', () => {
      console.log('\n\n👋 Goodbye!');
      this.rl.close();
      process.exit(0);
    });
  }
}

module.exports = RestClientApp;
