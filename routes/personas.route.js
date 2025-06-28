const { Router } = require('express');
const {
  getMethod,
  postMethod,
  putMethod,
  getAllMethod,
  deleteMethod
} = require('../controllers/personas');

const router = Router();


/**
 * @swagger
 * /api/personas/id/{id}:
 *   get:
 *     summary: Obtener una persona por ID
 *     tags: 
 *       - Personas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Persona encontrada
 *       404:
 *         description: Persona no encontrada
 */
router.get('/id/:id', getMethod);

/**
 * @swagger
 * /api/personas:
 *   post:
 *     summary: Registrar una nueva persona
 *     tags: 
 *       - Personas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               primerApellido:
 *                 type: string
 *               segundoApellido:
 *                 type: string
 *               // ...otros campos...
 *     responses:
 *       201:
 *         description: Persona creada
 */
router.post('/', postMethod);

/**
 * @swagger
 * /api/personas:
 *   put:
 *     summary: Actualizar una persona existente
 *     tags: 
 *       - Personas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               // ...otros campos requeridos...
 *     responses:
 *       200:
 *         description: Persona actualizada correctamente
 */
router.put('/', putMethod);

/**
 * @swagger
 * /api/personas/id/{id}:
 *   delete:
 *     summary: Eliminar una persona por ID
 *     tags: 
 *       - Personas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la persona a eliminar
 *     responses:
 *       200:
 *         description: Persona eliminada correctamente
 */
router.delete('/id/:id', deleteMethod);

/**
 * @swagger
 * /api/personas/all:
 *   get:
 *     summary: Obtener todas las personas
 *     tags:
 *       - Personas
 *     responses:
 *       200:
 *         description: Lista de personas
 */
router.get('/all', getAllMethod);

module.exports = router;
