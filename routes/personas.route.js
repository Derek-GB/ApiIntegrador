const {Router}=require('express');

const router=Router();


const {
  getMethod,
  postMethod,
  getAllMethod,
  deleteMethod}=require('../controllers/personas');

//Devolver datos desde mi API
router.get('/',   getMethod);

//Registrar o insertar
router.post('/',  postMethod);

//Eliminar
router.delete('/', deleteMethod);

//Actualizar
router.get('/all',   getAllMethod);


module.exports=router;