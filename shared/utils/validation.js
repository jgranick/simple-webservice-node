// Validation utilities for user data
const validation = {
  // Validate user creation data
  validateCreateUser: (data) => {
    const errors = [];
    
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      errors.push('Name is required and must be a non-empty string');
    }
    
    if (!data.email || typeof data.email !== 'string' || data.email.trim().length === 0) {
      errors.push('Email is required and must be a non-empty string');
    } else if (!isValidEmail(data.email)) {
      errors.push('Email must be a valid email address');
    }
    
    if (!data.age || isNaN(data.age) || parseInt(data.age) < 0) {
      errors.push('Age is required and must be a positive number');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },
  
  // Validate user update data
  validateUpdateUser: (data) => {
    const errors = [];
    
    if (data.name !== undefined && (typeof data.name !== 'string' || data.name.trim().length === 0)) {
      errors.push('Name must be a non-empty string');
    }
    
    if (data.email !== undefined) {
      if (typeof data.email !== 'string' || data.email.trim().length === 0) {
        errors.push('Email must be a non-empty string');
      } else if (!isValidEmail(data.email)) {
        errors.push('Email must be a valid email address');
      }
    }
    
    if (data.age !== undefined && (isNaN(data.age) || parseInt(data.age) < 0)) {
      errors.push('Age must be a positive number');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },
  
  // Validate user ID
  validateUserId: (id) => {
    const numId = parseInt(id);
    return {
      isValid: !isNaN(numId) && numId > 0,
      id: numId,
      error: isNaN(numId) || numId <= 0 ? 'ID must be a positive number' : null
    };
  }
};

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = validation;
