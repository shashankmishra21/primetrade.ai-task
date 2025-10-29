const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Task Management API',
    description: 'REST API with JWT Authentication and Role-Based Access Control',
    version: '1.0.0'
  },
  host: 'primetrade-ai-task.onrender.com',
  basePath: '/',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  
  // Security definitions
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'JWT Authorization header. Format: Bearer {token}'
    }
  },
  
  tags: [
    { name: 'Authentication', description: 'User registration and login' },
    { name: 'Tasks', description: 'Task CRUD operations' },
    { name: 'Admin', description: 'Admin-only endpoints' }
  ],
  
  definitions: {
    User: {
      id: 1,
      email: 'Shashank@gmail.com',
      name: 'Shashank',
      role: 'USER'
    },
    Task: {
      id: 1,
      title: 'Complete project',
      description: 'Finish backend assignment',
      status: 'PENDING',
      userId: 1
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./src/index.js'];

// Generate with custom options
swaggerAutogen(outputFile, routes, doc).then(async () => {
  console.log('Swagger generated');
  
  // Post-process: Add security to protected routes
  const fs = require('fs');
  const swaggerFile = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
  
  // Add security to all task and admin routes
  Object.keys(swaggerFile.paths).forEach(path => {
    if (path.includes('/api/v1/tasks') || path.includes('/api/v1/admin')) {
      Object.keys(swaggerFile.paths[path]).forEach(method => {
        swaggerFile.paths[path][method].security = [{ bearerAuth: [] }];
      });
    }
  });
  
  fs.writeFileSync(outputFile, JSON.stringify(swaggerFile, null, 2));
  console.log('Security added to protected routes');
});
