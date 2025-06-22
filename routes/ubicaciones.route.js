const {Router}= require('express');

const router=Router();

const {
  getAllMethod,
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
  }=require('../controllers/ubicaciones');

//Devolver un solo producto por ID
router.get('/', getMethod);   
    
//Devuelve todos los productos
router.get('/all', getAllMethod);             

// Registrar o insertar
router.post('/', postMethod);

// //Eliminar
router.delete('/', deleteMethod);

// //Actualizar
router.put('/',   putMethod);

module.exports=router;