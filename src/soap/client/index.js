const SoapClientApp = require('./app');

// Create and start the SOAP client application
const app = new SoapClientApp();
app.setupGracefulShutdown();
app.run().catch(console.error);
