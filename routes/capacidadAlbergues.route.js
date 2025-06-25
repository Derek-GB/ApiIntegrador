const {Router}= require('express');

const router=Router();

const {
  getAllMethod,
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
  }=require('../controllers/capacidadAlbergues');

//Devolver un solo producto por ID
router.get('/id/:id', getMethod);   
    
//Devuelve todos los productos
router.get('/all', getAllMethod);             

// Registrar o insertar
router.post('/', postMethod);

// //Eliminar
router.delete('/id/:id', deleteMethod);

// //Actualizar
router.put('/',   putMethod);

module.exports=router;