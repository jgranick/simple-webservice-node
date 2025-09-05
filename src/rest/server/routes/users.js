const express = require('express');
const userData = require('../../../../shared/data/users');
const validation = require('../../../../shared/utils/validation');
const logger = require('../../../../shared/utils/logger');

const router = express.Router();

// GET /api/users - Get all users
router.get('/', (req, res) => {
  const users = userData.getAllUsers();
  logger.log(`GET /api/users - Returning ${users.length} users`);
  
  res.json({
    success: true,
    data: users,
    count: users.length
  });
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
  const idValidation = validation.validateUserId(req.params.id);
  
  if (!idValidation.isValid) {
    return res.status(400).json({
      success: false,
      message: idValidation.error
    });
  }
  
  logger.log(`GET /api/users/${idValidation.id}`);
  
  const user = userData.getUserById(idValidation.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json({
    success: true,
    data: user
  });
});

// POST /api/users - Create new user
router.post('/', (req, res) => {
  const validationResult = validation.validateCreateUser(req.body);
  
  if (!validationResult.isValid) {
    return res.status(400).json({
      success: false,
      message: validationResult.errors.join(', ')
    });
  }
  
  const { name, email, age } = req.body;
  
  logger.log('POST /api/users - Creating user:', { name, email, age });
  
  // Check if email already exists
  if (userData.emailExists(email)) {
    return res.status(400).json({
      success: false,
      message: 'Email already exists'
    });
  }
  
  const newUser = userData.createUser({ name, email, age });
  
  res.status(201).json({
    success: true,
    data: newUser,
    message: 'User created successfully'
  });
});

// PUT /api/users/:id - Update user
router.put('/:id', (req, res) => {
  const idValidation = validation.validateUserId(req.params.id);
  
  if (!idValidation.isValid) {
    return res.status(400).json({
      success: false,
      message: idValidation.error
    });
  }
  
  const validationResult = validation.validateUpdateUser(req.body);
  
  if (!validationResult.isValid) {
    return res.status(400).json({
      success: false,
      message: validationResult.errors.join(', ')
    });
  }
  
  logger.log(`PUT /api/users/${idValidation.id} - Updating user`);
  
  const updatedUser = userData.updateUser(idValidation.id, req.body);
  
  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json({
    success: true,
    data: updatedUser,
    message: 'User updated successfully'
  });
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req, res) => {
  const idValidation = validation.validateUserId(req.params.id);
  
  if (!idValidation.isValid) {
    return res.status(400).json({
      success: false,
      message: idValidation.error
    });
  }
  
  logger.log(`DELETE /api/users/${idValidation.id}`);
  
  const deletedUser = userData.deleteUser(idValidation.id);
  
  if (!deletedUser) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json({
    success: true,
    data: deletedUser,
    message: 'User deleted successfully'
  });
});

module.exports = router;
