const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Event Management System API Documentation',
      version: '1.0.0',
      description: 'API documentation for Event Management System',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./index.js', './swagger.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;
