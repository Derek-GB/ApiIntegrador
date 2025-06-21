const express= require('express');
const cors=require('cors');
require('dotenv').config();

class servidor{
    constructor(){
     this.app=express();
     this.port=process.env.PORT;
     this.usersPath='/api/productos';
     this.middlewares();
     this.routes();
    }
    //Metodo que contiene las rutas
routes(){
//Creamos la primera peticion 
this.app.use(this.usersPath,require('../routes/productos.route'));
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