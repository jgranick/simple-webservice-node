const RestClientApp = require('./app');

// Create and start the REST client application
const app = new RestClientApp();
app.setupGracefulShutdown();
app.run().catch(console.error);
