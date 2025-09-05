const express = require('express');
const userRoutes = require('./routes/users');
const healthRoutes = require('./routes/health');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { REST_PORT } = require('../../../config/ports');
const logger = require('../../../shared/utils/logger');

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/health', healthRoutes);

// Error handling
app.use(errorHandler);
app.use('*', notFoundHandler);

// Start server
const startServer = () => {
  const endpoints = [
    'GET    /api/health',
    'GET    /api/users',
    'GET    /api/users/:id',
    'POST   /api/users',
    'PUT    /api/users/:id',
    'DELETE /api/users/:id'
  ];
  
  app.listen(REST_PORT, () => {
    logger.serverStart('REST', REST_PORT, endpoints);
    console.log(`\n💡 Use 'npm run client' to start the terminal frontend`);
  });
};

module.exports = { app, startServer };
