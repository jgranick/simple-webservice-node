// In-memory data store for users
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
];

let nextId = 4;

// User data management functions
const userData = {
  // Get all users
  getAllUsers: () => users,
  
  // Get user by ID
  getUserById: (id) => users.find(u => u.id === id),
  
  // Create new user
  createUser: (userData) => {
    const newUser = {
      id: nextId++,
      name: userData.name,
      email: userData.email,
      age: parseInt(userData.age)
    };
    users.push(newUser);
    return newUser;
  },
  
  // Update user
  updateUser: (id, updateData) => {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;
    
    // Update only provided fields
    if (updateData.name) users[userIndex].name = updateData.name;
    if (updateData.email) users[userIndex].email = updateData.email;
    if (updateData.age) users[userIndex].age = parseInt(updateData.age);
    
    return users[userIndex];
  },
  
  // Delete user
  deleteUser: (id) => {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;
    
    return users.splice(userIndex, 1)[0];
  },
  
  // Check if email exists
  emailExists: (email) => users.find(u => u.email === email),
  
  // Get user count
  getUserCount: () => users.length,
  
  // Reset data (for testing)
  resetData: () => {
    users = [
      { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
    ];
    nextId = 4;
  }
};

module.exports = userData;
