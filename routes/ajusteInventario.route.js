const { Router } = require('express');
const router = Router();
const ajusteInventarioController = require('../controllers/ajusteInventarioController');


const {
    
} = require('../controllers/ajusteInventarioController');

/*
    * @swagger
    * /api/ajusteInventario/all:
    *   get:
    *     summary: Obtener todos los ajustes de inventario
    *     tags: 
    *       - AjusteInventario
    */
router.get('/all', ajusteInventarioController.getAllAjusteInventarios);

/*
    * @swagger
    * /api/ajusteInventario/id/{id}:
    *   get:
    *     summary: Obtener un ajuste de inventario por ID
    *     tags: 
    *       - AjusteInventario
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: integer
    *         description: ID del ajuste de inventario a obtener
    */
router.get('/id/:id', ajusteInventarioController.getAjuste);

/*
    * @swagger
    * /api/ajusteInventario:
    *   post:
    *     summary: Registrar un nuevo ajuste de inventario
    *     tags: 
    *       - AjusteInventario
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               idProducto:
    *                 type: integer
    *               justificacion:
    *                 type: string
    *               cantidadOriginal:
    *                 type: integer
    *               cantidadAjustada:
    *                 type: integer
    *               idUsuarioCreacion:
    *                 type: integer
    */
router.post('/', ajusteInventarioController.postAjuste);

module.exports = router;