const express= require('express');
const cors=require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config();

// Configuración de swagger-jsdoc
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentación API',
    version: '1.0.0',
    description: 'Documentación de las rutas de la API, proyecto integrador (Por 4D)',
  },
  servers: [
    {
      url: '/api/documentacion',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.route.js'], // aquí busca los comentarios JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

class servidor{
    constructor(){
     this.app=express();
     this.port=process.env.PORT;
     this.rutas=require('../src/consts/rutas');
     this.middlewares();
     this.routes();
    }
    //Metodo que contiene las rutas
routes() {
  // Servir la documentación en /api/documentacion
  this.app.use('/api/documentacion', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      docExpansion: 'none'  // que los tag vengan colapsados por defecto
    }
  }));
  // Recorre las rutas y las aplica al servidor
  this.rutas.forEach(({ path, route }) => {
    this.app.use(path, route);
  });
}
//Funciones que tiene el express y que me permite usarlas reutilizando codigo
middlewares(){
    this.app.use(express.static('public'));
    this.app.use(cors());
    //Habilitar el parseo de los datos del body
    this.app.use(express.json());
}

listen(){
    this.app.listen(this.port || 3000, ()=>{ 
         console.log(`El servidor esta corriendo en el puerto ${this.port}`);
    });
}

}
module.exports=servidor;