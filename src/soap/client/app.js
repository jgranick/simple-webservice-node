const readline = require('readline');
const SoapClient = require('./api/soapClient');
const UserCommands = require('./commands/userCommands');
const display = require('../../../shared/utils/display');
const logger = require('../../../shared/utils/logger');
const { SOAP_PORT } = require('../../../config/ports');

// SOAP Client Application
class SoapClientApp {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    this.soapClient = new SoapClient();
    this.userCommands = new UserCommands(this.soapClient, this.askQuestion.bind(this));
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
    const connected = await this.soapClient.initializeClient();
    if (!connected) {
      logger.clientConnectionError('SOAP', SOAP_PORT, 'npm run soap-server');
      return false;
    }
    
    logger.clientConnected('SOAP', `http://localhost:${SOAP_PORT}`);
    return true;
  }

  // Main application loop
  async run() {
    console.log('🌐 SOAP Terminal User Management Client');
    console.log(`Connecting to SOAP service at http://localhost:${SOAP_PORT}`);
    
    // Initialize client
    const connected = await this.initializeClient();
    if (!connected) {
      process.exit(1);
    }
    
    while (true) {
      display.displaySoapMenu();
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
        case '7':
          await this.userCommands.showWSDL();
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

module.exports = SoapClientApp;
