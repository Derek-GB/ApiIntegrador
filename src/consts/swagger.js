const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

// Configuración de swagger-jsdoc
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Documentación API",
        version: "1.0.0",
        description:
            "Documentación de las rutas de la API, proyecto integrador (Por 4D)",
    },
    servers: [
        {
            url: "https://apiintegrador-production-8ad3.up.railway.app",
        },
        {
            url: "http://localhost:4000",
        }
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'auth-token', // Nombre de la cookie
          description: 'Token de autenticación almacenado en cookie'
        }
      }
    },
    security: [
      {
        cookieAuth: []
      }
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./routes/*.route.js", "./Auth/*route.js"], // aquí busca los comentarios JSDoc
};

const spec = swaggerJSDoc(options);

const serve = swaggerUi.serve;

const setup = swaggerUi.setup(spec, {
    swaggerOptions: {
        docExpansion: "none",
        requestInterceptor: (request) => {
      request.credentials = 'include';
      return request;
    },
    responseInterceptor: (response) => {
      return response;
    }
    }
});

module.exports = { setup, serve };