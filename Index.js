const express = require("express");
const cors = require("cors");
const path = require('path');
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cookieParser = require('cookie-parser');
require("dotenv").config();

const verificarToken = require('./middleware/verificarToken.js');
const publicRoutes = require('./routes/publicRoutes.route');
const usuariosRoutes = require('./routes/usuarios.route');
const authMiddleware = require('./middleware/authMiddleware');
const basedatos = require("./MySQL/basedatos.js");

// Configuración de swagger-jsdoc
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Documentación API",
    version: "1.0.0",
    description: "Documentación de las rutas de la API, proyecto integrador (Por 4D)",
  },
  servers: [
    {
      url: "/api/documentacion",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.route.js", "./Auth/*route.js"],
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
    this.app.use(
      "/api/documentacion",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
          docExpansion: "none",
        },
      })
    );
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(cookieParser()); // Agregado cookieParser que faltaba
  }

  // Método para inicializar la base de datos
  async inicializarBaseDatos() {
    try {
      console.log('🔄 Inicializando conexión a la base de datos...');
      await basedatos.connect();
      console.log('✅ Base de datos conectada exitosamente');
      return true;
    } catch (error) {
      console.error('❌ Error fatal: No se pudo conectar a la base de datos');
      console.error(error.message);
      process.exit(1); // Terminar la aplicación si no hay BD
    }
  }

  // Método modificado para inicializar BD antes de escuchar
  async listen() {
    try {
      // Primero conectar la base de datos
      await this.inicializarBaseDatos();
      
      // Luego iniciar el servidor
      this.app.listen(this.port || 3000, () => {
        console.log(`🚀 El servidor está corriendo en el puerto ${this.port || 3000}`);
        console.log(`📚 Documentación disponible en: http://localhost:${this.port || 3000}/api/documentacion`);
      });
    } catch (error) {
      console.error('❌ Error al iniciar el servidor:', error.message);
      process.exit(1);
    }
  }
}

module.exports = servidor;