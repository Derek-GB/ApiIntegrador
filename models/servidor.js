const express = require("express");
const cors = require("cors");
const path = require('path');
const swagger = require('../src/consts/swagger');
require("dotenv").config();
const publicRoutes = require('../routes/publicRoutes.route');
const authMiddleware = require('../middleware/authMiddleware');

class servidor {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/api/auth";
    this.rutas = require("../src/consts/rutas");
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use(this.authPath, require("../Auth/auth.route"));
    this.app.use('/api/public', publicRoutes);
    this.rutas.forEach(({ path, route }) => {
    this.app.use(path, authMiddleware, route); 
    });
    this.app.use(
      "/api/documentacion",
      swagger.serve,
      swagger.setup
    );
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(
      cors({
        origin: [
          "http://localhost:5173",
          "http://201.197.202.42",
          "http://192.168.0.11",
          "http://192.168.0.11:80",
          "http://192.168.0.11:8080",

        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: [
          "Content-Type",
          "Authorization",
          "Accept",
          "X-Requested-With",
          "X-CSRF-Token",
          "X-Client-Version",
          "X-User-ID",
        ],
      })
    );
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port || 3000, () => {
      console.log(`El servidor esta corriendo en el puerto ${this.port}`);
    });
  }
}
module.exports = servidor;