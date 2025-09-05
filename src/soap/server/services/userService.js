const userData = require('../../../../shared/data/users');
const validation = require('../../../../shared/utils/validation');
const logger = require('../../../../shared/utils/logger');

// SOAP Service Implementation
const userService = {
  UserService: {
    UserServicePortType: {
      getAllUsers: function(args, callback) {
        const users = userData.getAllUsers();
        logger.log(`SOAP getAllUsers - Returning ${users.length} users`);
        
        const result = {
          users: {
            user: users
          },
          count: users.length
        };
        
        callback(null, result);
      },

      getUser: function(args, callback) {
        const idValidation = validation.validateUserId(args.id);
        
        if (!idValidation.isValid) {
          return callback({
            Fault: {
              faultcode: 'Client',
              faultstring: idValidation.error
            }
          });
        }
        
        logger.log(`SOAP getUser - ID: ${idValidation.id}`);
        
        const user = userData.getUserById(idValidation.id);
        
        if (!user) {
          return callback({
            Fault: {
              faultcode: 'Client',
              faultstring: 'User not found'
            }
          });
        }
        
        const result = {
          user: user
        };
        
        callback(null, result);
      },

      createUser: function(args, callback) {
        const validationResult = validation.validateCreateUser(args);
        
        if (!validationResult.isValid) {
          return callback({
            Fault: {
              faultcode: 'Client',
              faultstring: validationResult.errors.join(', ')
            }
          });
        }
        
        const { name, email, age } = args;
        logger.log('SOAP createUser - Creating user:', { name, email, age });
        
        // Check if email already exists
        if (userData.emailExists(email)) {
          return callback({
            Fault: {
              faultcode: 'Client',
              faultstring: 'Email already exists'
            }
          });
        }
        
        const newUser = userData.createUser({ name, email, age });
        
        const result = {
          user: newUser,
          message: 'User created successfully'
        };
        
        callback(null, result);
      },

      updateUser: function(args, callback) {
        const idValidation = validation.validateUserId(args.id);
        
        if (!idValidation.isValid) {
          return callback({
            Fault: {
              faultcode: 'Client',
              faultstring: idValidation.error
            }
          });
        }
        
        const validationResult = validation.validateUpdateUser(args);
        
        if (!validationResult.isValid) {
          return callback({
            Fault: {
              faultcode: 'Client',
              faultstring: validationResult.errors.join(', ')
            }
          });
        }
        
        logger.log(`SOAP updateUser - ID: ${idValidation.id}`);
        
        const updatedUser = userData.updateUser(idValidation.id, args);
        
        if (!updatedUser) {
          return callback({
            Fault: {
              faultcode: 'Client',
              faultstring: 'User not found'
            }
          });
        }
        
        const result = {
          user: updatedUser,
          message: 'User updated successfully'
        };
        
        callback(null, result);
      },

      deleteUser: function(args, callback) {
        const idValidation = validation.validateUserId(args.id);
        
        if (!idValidation.isValid) {
          return callback({
            Fault: {
              faultcode: 'Client',
              faultstring: idValidation.error
            }
          });
        }
        
        logger.log(`SOAP deleteUser - ID: ${idValidation.id}`);
        
        const deletedUser = userData.deleteUser(idValidation.id);
        
        if (!deletedUser) {
          return callback({
            Fault: {
              faultcode: 'Client',
              faultstring: 'User not found'
            }
          });
        }
        
        const result = {
          user: deletedUser,
          message: 'User deleted successfully'
        };
        
        callback(null, result);
      },

      health: function(args, callback) {
        logger.log('SOAP health check');
        
        const result = {
          message: 'SOAP Server is running',
          timestamp: new Date().toISOString(),
          uptime: process.uptime()
        };
        
        callback(null, result);
      }
    }
  }
};

module.exports = userService;
