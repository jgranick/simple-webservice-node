// Display utilities for terminal output
const display = {
  // Display users in a formatted table
  displayUsers: (users) => {
    if (!users || users.length === 0) {
      console.log('No users found.');
      return;
    }
    
    console.log('\n📋 Users:');
    console.log('┌────┬─────────────────┬─────────────────────────┬─────┐');
    console.log('│ ID │ Name            │ Email                   │ Age │');
    console.log('├────┼─────────────────┼─────────────────────────┼─────┤');
    
    users.forEach(user => {
      const name = user.name.padEnd(15).substring(0, 15);
      const email = user.email.padEnd(23).substring(0, 23);
      console.log(`│ ${user.id.toString().padStart(2)} │ ${name} │ ${email} │ ${user.age.toString().padStart(3)} │`);
    });
    
    console.log('└────┴─────────────────┴─────────────────────────┴─────┘');
  },
  
  // Display single user details
  displayUser: (user) => {
    console.log('\n👤 User Details:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Age: ${user.age}`);
  },
  
  // Display REST menu
  displayRestMenu: () => {
    console.log('\n🔧 User Management System');
    console.log('═══════════════════════════');
    console.log('1. List all users');
    console.log('2. Get user by ID');
    console.log('3. Create new user');
    console.log('4. Update user');
    console.log('5. Delete user');
    console.log('6. Health check');
    console.log('0. Exit');
    console.log('═══════════════════════════');
  },
  
  // Display SOAP menu
  displaySoapMenu: () => {
    console.log('\n🔧 SOAP User Management System');
    console.log('═══════════════════════════════');
    console.log('1. List all users');
    console.log('2. Get user by ID');
    console.log('3. Create new user');
    console.log('4. Update user');
    console.log('5. Delete user');
    console.log('6. Health check');
    console.log('7. Show WSDL');
    console.log('0. Exit');
    console.log('═══════════════════════════════');
  },
  
  // Display success message
  success: (message, data = null) => {
    console.log(`✅ ${message}`);
    if (data) {
      display.displayUser(data);
    }
  },
  
  // Display error message
  error: (message) => {
    console.log(`❌ ${message}`);
  },
  
  // Display info message
  info: (message) => {
    console.log(`ℹ️  ${message}`);
  }
};

module.exports = display;
