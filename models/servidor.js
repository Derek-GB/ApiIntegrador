const express = require("express");
const cors = require("cors");
const path = require('path');
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cookieParser = require('cookie-parser');
require("dotenv").config();
const verificarToken = require('../middleware/verificarToken');
const publicRoutes = require('../routes/publicRoutes.route');
const usuariosRoutes = require('../routes/usuarios.route');
const authMiddleware = require('../middleware/authMiddleware');

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
      url: "/api/documentacion",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.route.js", "./Auth/*route.js"], // aquí busca los comentarios JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

class servidor {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/api/auth";
    this.rutas = require("./src/consts/rutas");
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use(this.authPath, require("./Auth/auth.route"));
    this.app.use('/api/public', publicRoutes);
    this.rutas.forEach(({ path, route }) => {
      this.app.use(path, verificarToken, route);
    });

    this.app.use('/css', express.static(path.join(__dirname, './src/css')));
    // Servir la documentación en /api/documentacion
    this.app.use(
      "/api/documentacion",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        // customCssUrl: '/css/swagger-dark.css', // Ruta al CSS personalizado
        swaggerOptions: {
          docExpansion: "none", // que los tag vengan colapsados por defecto
        },
      })
    );
  }
  //Funciones que tiene el express y que me permite usarlas reutilizando codigo
  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(cors());
    //Habilitar el parseo de los datos del body
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port || 3000, () => {
      console.log(`El servidor esta corriendo en el puerto ${this.port}`);
    });
  }
}
module.exports = servidor;

//importos
