const {Router}=require('express');

const router=Router();


const {
  getMethod,
  postMethod,
  putMethod,
  getAllMethod,
  deleteMethod}=require('../controllers/personas');

//Devolver datos desde mi API
router.get('/id/:id',   getMethod);

//Registrar o insertar
router.post('/',  postMethod);

//Registrar o insertar
router.put('/',  putMethod);

//Eliminar
router.delete('/id/:id', deleteMethod);

//Actualizar
router.get('/all',   getAllMethod);


module.exports=router;