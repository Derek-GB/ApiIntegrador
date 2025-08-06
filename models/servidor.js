const express = require("express");
const cors = require("cors");
const path = require('path');
const swagger = require('../src/consts/swagger');

const cookieParser = require('cookie-parser');
require("dotenv").config();
// Importar middleware de verificación de token
const verificarToken = require('../middleware/verificarToken');
// Importar TokenMaintenance para la limpieza automática
//const TokenMaintenance = require('../Auth/TokenMaintenance');
const publicRoutes = require('../routes/publicRoutes.route');
const usuariosRoutes = require('../routes/usuarios.route');
const authMiddleware = require('../middleware/authMiddleware');


class servidor {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/api/auth"; // Ruta de autenticación
    this.rutas = require("../src/consts/rutas");
    this.middlewares();
    this.routes();
    //this.initializeTokenMaintenance(); 
  }

  // Método para inicializar el mantenimiento de tokens
  /*initializeTokenMaintenance() {
    try {
      // Iniciar la limpieza automática de tokens
      TokenMaintenance.startCleanupSchedule();
      console.log('Sistema de mantenimiento de tokens inicializado');
    } catch (error) {
      console.error('Error inicializando el mantenimiento de tokens:', error);
    }
  }
*/
  //Metodo que contiene las rutas
  routes() {
    // Ruta de autenticación (pública - NO protegida)
    this.app.use(this.authPath, require("../Auth/auth.route"));
    // RUTAS PÚBLICAS (sin autenticación)
    this.app.use('/api/public', publicRoutes);

    // RUTAS PROTEGIDAS (con autenticación)
    // this.app.use('/api/usuarios', authMiddleware, usuariosRoutes);
    // Rutas protegidas (aplica el middleware de verificación de token)
    this.rutas.forEach(({ path, route }) => {
      this.app.use(path, verificarToken, route); // <- Middleware aplicado a todas las rutas
    });
    // Servir la documentación en /api/documentacion
    this.app.use(
      "/api/documentacion",
      swagger.serve,
      swagger.setup
    );
  }
  //Funciones que tiene el express y que me permite usarlas reutilizando codigo
  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(
      cors({
        origin: [
          "http://localhost:5173",
          "http://201.197.202.42",
          "http://192.168.0.10:80",
        ], // Permitir solicitudes solo desde estas IPs
        credentials: true, // Permitir cookies y credenciales
        methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
        allowedHeaders: [
          "Content-Type",
          "Authorization",
          "Accept",
          "X-Requested-With",
          "X-CSRF-Token",
          "X-Client-Version",
          "X-User-ID",
        ], // Encabezados permitidos
      })
    );
    //Habilitar el parseo de los datos del body
    this.app.use(express.json());
    this.app.use(cookieParser())
  }

  listen() {
    this.app.listen(this.port || 3000, () => {
      console.log(`El servidor esta corriendo en el puerto ${this.port}`);
    });
  }
}
module.exports = servidor;

//importos
