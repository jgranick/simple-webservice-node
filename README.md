# Simple Web Service with Node.js

A simple web service example featuring both REST and SOAP implementations with Node.js backends and terminal-based frontends.

## Features

### REST Implementation
- **Backend**: Express.js server with RESTful API endpoints
- **Frontend**: Interactive terminal-based client
- **CRUD Operations**: Create, Read, Update, Delete users
- **Real-time Communication**: REST API between backend and frontend
- **In-memory Storage**: Simple data persistence (resets on server restart)

### SOAP Implementation
- **Backend**: SOAP server with WSDL definition
- **Frontend**: Interactive terminal-based SOAP client
- **XML-based Communication**: SOAP protocol with XML data exchange
- **WSDL Service Definition**: Complete service contract
- **Same CRUD Operations**: Identical functionality via SOAP

## Project Structure

```
├── package.json                    # Dependencies and scripts
├── README.md                      # This file
├── config/
│   └── ports.js                   # Port configuration
├── shared/
│   ├── data/
│   │   └── users.js              # User data management
│   └── utils/
│       ├── validation.js         # Input validation utilities
│       ├── logger.js             # Logging utilities
│       └── display.js            # Display utilities
└── src/
    ├── rest/
    │   ├── server/
    │   │   ├── index.js          # REST server entry point
    │   │   ├── app.js            # REST server application
    │   │   ├── routes/
    │   │   │   ├── users.js      # User routes
    │   │   │   └── health.js     # Health check route
    │   │   └── middleware/
    │   │       └── errorHandler.js # Error handling middleware
    │   └── client/
    │       ├── index.js          # REST client entry point
    │       ├── app.js            # REST client application
    │       ├── api/
    │       │   └── restClient.js # REST API client
    │       └── commands/
    │           └── userCommands.js # User command handlers
    └── soap/
        ├── server/
        │   ├── index.js          # SOAP server entry point
        │   ├── app.js            # SOAP server application
        │   ├── wsdl/
        │   │   └── definition.js # WSDL definition
        │   └── services/
        │       └── userService.js # SOAP service implementation
        └── client/
            ├── index.js          # SOAP client entry point
            ├── app.js            # SOAP client application
            ├── api/
            │   └── soapClient.js # SOAP API client
            └── commands/
                └── userCommands.js # User command handlers
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### REST Implementation

#### 2. Start the REST Backend Server

```bash
npm start
```

The REST server will start on `http://localhost:3000` and display available endpoints.

#### 3. Start the REST Frontend Client (in a new terminal)

```bash
npm run client
```

### SOAP Implementation

#### 2. Start the SOAP Backend Server

```bash
npm run soap-server
```

The SOAP server will start on `http://localhost:3001` and display available SOAP operations.

#### 3. Start the SOAP Frontend Client (in a new terminal)

```bash
npm run soap-client
```

## API Endpoints

### REST API Endpoints (Port 3000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### SOAP API Endpoints (Port 3001)

| Operation | Description |
|-----------|-------------|
| `getAllUsers()` | Get all users |
| `getUser(id)` | Get user by ID |
| `createUser(name, email, age)` | Create new user |
| `updateUser(id, name?, email?, age?)` | Update user |
| `deleteUser(id)` | Delete user |
| `health()` | Server health check |

**SOAP URLs:**
- WSDL: `http://localhost:3001/wsdl`
- SOAP Endpoint: `http://localhost:3001/soap`

## Usage Examples

### REST Implementation

#### REST Backend Server

The REST server provides a RESTful API for user management:

```bash
# Start REST server
npm start

# Server output:
🚀 Server running on http://localhost:3000
📊 API endpoints available:
   GET    /api/health
   GET    /api/users
   GET    /api/users/:id
   POST   /api/users
   PUT    /api/users/:id
   DELETE /api/users/:id
```

#### REST Frontend Client

The REST terminal client provides an interactive menu:

```bash
# Start REST client
npm run client

# Client menu:
🔧 User Management System
═══════════════════════════
1. List all users
2. Get user by ID
3. Create new user
4. Update user
5. Delete user
6. Health check
0. Exit
```

### SOAP Implementation

#### SOAP Backend Server

The SOAP server provides SOAP web services with WSDL:

```bash
# Start SOAP server
npm run soap-server

# Server output:
🚀 SOAP Server running on http://localhost:3001
📊 SOAP endpoints available:
   WSDL: http://localhost:3001/wsdl
   SOAP: http://localhost:3001/soap

🔧 Available SOAP operations:
   - getAllUsers()
   - getUser(id)
   - createUser(name, email, age)
   - updateUser(id, name?, email?, age?)
   - deleteUser(id)
   - health()
```

#### SOAP Frontend Client

The SOAP terminal client provides an interactive menu:

```bash
# Start SOAP client
npm run soap-client

# Client menu:
🔧 SOAP User Management System
═══════════════════════════════
1. List all users
2. Get user by ID
3. Create new user
4. Update user
5. Delete user
6. Health check
7. Show WSDL
0. Exit
```

### Sample API Requests

#### REST API Testing with curl

```bash
# Get all users
curl http://localhost:3000/api/users

# Create a new user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Johnson","email":"alice@example.com","age":28}'

# Get user by ID
curl http://localhost:3000/api/users/1

# Update user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Smith","age":29}'

# Delete user
curl -X DELETE http://localhost:3000/api/users/1
```

#### SOAP API Testing

You can test the SOAP API using SOAP clients or by viewing the WSDL:

```bash
# View WSDL definition
curl http://localhost:3001/wsdl

# Test SOAP endpoint (requires SOAP client)
# WSDL URL: http://localhost:3001/wsdl
# SOAP Endpoint: http://localhost:3001/soap
```

## Development

### Development Mode

For development with auto-restart:

```bash
npm run dev
```

### Project Scripts

#### REST Scripts
- `npm start` - Start the REST backend server
- `npm run client` - Start the REST terminal frontend
- `npm run dev` - Start REST server in development mode with auto-restart

#### SOAP Scripts
- `npm run soap-server` - Start the SOAP backend server
- `npm run soap-client` - Start the SOAP terminal frontend
- `npm run soap-dev` - Start SOAP server in development mode with auto-restart

## Data Model

Users have the following structure:

```javascript
{
  id: number,        // Auto-generated unique identifier
  name: string,      // User's full name
  email: string,     // User's email address (unique)
  age: number        // User's age
}
```

## Error Handling

The API returns consistent error responses:

```javascript
{
  success: false,
  message: "Error description"
}
```

Success responses include:

```javascript
{
  success: true,
  data: { /* response data */ },
  message: "Optional success message"
}
```

## Notes

### General Notes
- Data is stored in memory and will be lost when the server restarts
- Email addresses must be unique
- All fields (name, email, age) are required when creating users
- Use Ctrl+C to gracefully exit both server and client

### REST Implementation
- REST client automatically connects to `http://localhost:3000`
- Uses JSON for data exchange
- Standard HTTP methods (GET, POST, PUT, DELETE)

### SOAP Implementation
- SOAP client automatically connects to `http://localhost:3001`
- Uses XML for data exchange
- WSDL available at `http://localhost:3001/wsdl`
- SOAP operations use method calls instead of HTTP verbs

## Architecture Benefits

### Modular Design
- **Separation of Concerns**: Each component has a single responsibility
- **Reusable Components**: Shared utilities and data management
- **Easy Maintenance**: Changes to one component don't affect others
- **Scalable Structure**: Easy to add new features or modify existing ones

### Code Organization
- **Clear File Structure**: Logical grouping of related functionality
- **Consistent Patterns**: Similar structure for both REST and SOAP implementations
- **Shared Resources**: Common validation, logging, and display utilities
- **Configuration Management**: Centralized port and settings configuration

### Development Benefits
- **Easier Testing**: Individual components can be tested in isolation
- **Better Debugging**: Clear separation makes it easier to locate issues
- **Team Collaboration**: Multiple developers can work on different components
- **Code Reusability**: Shared utilities reduce code duplication

## Technologies Used

### REST Implementation
- **Node.js** - Runtime environment
- **Express.js** - Web framework for the REST backend
- **Axios** - HTTP client for REST API requests
- **Readline** - Terminal input handling
- **Nodemon** - Development auto-restart (dev dependency)

### SOAP Implementation
- **Node.js** - Runtime environment
- **SOAP** - SOAP web service library
- **XML2JS** - XML parsing and generation
- **Express.js** - Web framework for the SOAP backend
- **Readline** - Terminal input handling
- **Nodemon** - Development auto-restart (dev dependency)