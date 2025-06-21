const {Router}=require('express');

const routerUsuarios=Router();


const {
  getMethod,
  postMethod,
  putMethod,
  deleteMethod}=require('../controllers/usuarios');

//Devolver datos desde mi API
router.get('/',   getMethod);

//Registrar o insertar
router.post('/',  postMethod);

//Eliminar
router.delete('/', deleteMethod);

//Actualizar
router.put('/:id',   putMethod);


module.exports=routerUsuarios;

