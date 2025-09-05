const express = require('express');
const soap = require('soap');
const wsdl = require('./wsdl/definition');
const userService = require('./services/userService');
const { SOAP_PORT } = require('../../../config/ports');
const logger = require('../../../shared/utils/logger');

// Create Express app
const app = express();

// Serve WSDL
app.get('/wsdl', (req, res) => {
  res.set('Content-Type', 'text/xml');
  res.send(wsdl);
});

// Create SOAP server
const server = soap.listen(app, '/soap', userService, wsdl);

// Error handling and logging
server.on('request', (request, methodName) => {
  logger.log(`SOAP Request: ${methodName}`);
});

server.on('response', (response, methodName) => {
  logger.log(`SOAP Response: ${methodName}`);
});

// Start server
const startServer = () => {
  const endpoints = [
    'WSDL: http://localhost:3001/wsdl',
    'SOAP: http://localhost:3001/soap'
  ];
  
  const operations = [
    'getAllUsers()',
    'getUser(id)',
    'createUser(name, email, age)',
    'updateUser(id, name?, email?, age?)',
    'deleteUser(id)',
    'health()'
  ];
  
  app.listen(SOAP_PORT, () => {
    logger.serverStart('SOAP', SOAP_PORT, endpoints);
    logger.soapOperations(operations);
    console.log(`\n💡 Use 'npm run soap-client' to start the SOAP terminal client`);
  });
};

module.exports = { app, startServer };
