// Logging utility for consistent log formatting
const logger = {
  // Log with timestamp
  log: (message, data = null) => {
    const timestamp = new Date().toISOString();
    if (data) {
      console.log(`[${timestamp}] ${message}`, data);
    } else {
      console.log(`[${timestamp}] ${message}`);
    }
  },
  
  // Log errors
  error: (message, error = null) => {
    const timestamp = new Date().toISOString();
    if (error) {
      console.error(`[${timestamp}] ERROR: ${message}`, error);
    } else {
      console.error(`[${timestamp}] ERROR: ${message}`);
    }
  },
  
  // Log server startup
  serverStart: (type, port, endpoints) => {
    console.log(`\n🚀 ${type} Server running on http://localhost:${port}`);
    console.log(`📊 ${type} endpoints available:`);
    endpoints.forEach(endpoint => {
      console.log(`   ${endpoint}`);
    });
  },
  
  // Log SOAP operations
  soapOperations: (operations) => {
    console.log(`\n🔧 Available SOAP operations:`);
    operations.forEach(operation => {
      console.log(`   - ${operation}`);
    });
  },
  
  // Log client connection
  clientConnected: (type, url) => {
    console.log(`✅ Connected to ${type} service successfully!`);
    console.log(`   Service URL: ${url}`);
  },
  
  // Log client connection error
  clientConnectionError: (type, port, command) => {
    console.log(`❌ Cannot connect to ${type} service. Make sure the server is running on port ${port}.`);
    console.log(`   Run: ${command}`);
  }
};

module.exports = logger;
