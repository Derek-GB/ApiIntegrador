const { Router } = require('express');
const router = Router();

const {
  getAllMethod,
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
} = require('../controllers/capacidadAlbergues');

/**
 * @swagger
 * /api/capacidadAlbergues/id/{id}:
 *   get:
 *     tags:
 *       - Capacidad Albergues
 *     summary: Obtener capacidad de albergue por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la capacidad
 *     responses:
 *       200:
 *         description: Registro obtenido exitosamente
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/id/:id', getMethod);

/**
 * @swagger
 * /api/capacidadAlbergues/all:
 *   get:
 *     tags:
 *       - Capacidad Albergues
 *     summary: Obtener todas las capacidades de albergues
 *     responses:
 *       200:
 *         description: Lista de capacidades obtenida correctamente
 *       500:
 *         description: Error al obtener las capacidades
 */
router.get('/all', getAllMethod);

/**
 * @swagger
 * /api/capacidadAlbergues:
 *   post:
 *     tags:
 *       - Capacidad Albergues
 *     summary: Insertar una nueva capacidad de albergue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - capacidad_personas
 *               - capacidad_colectiva
 *               - cantidad_familias
 *               - ocupacion
 *               - egresos
 *               - sospechosos_sanos
 *             properties:
 *               capacidad_personas:
 *                 type: integer
 *               capacidad_colectiva:
 *                 type: integer
 *               cantidad_familias:
 *                 type: integer
 *               ocupacion:
 *                 type: integer
 *               egresos:
 *                 type: integer
 *               sospechosos_sanos:
 *                 type: integer
 *               otros:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro creado correctamente
 *       400:
 *         description: Faltan campos obligatorios
 *       500:
 *         description: Error al crear el registro
 */
router.post('/', postMethod);

/**
 * @swagger
 * /api/capacidadAlbergues:
 *   put:
 *     tags:
 *       - Capacidad Albergues
 *     summary: Actualizar capacidad de albergue existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - capacidad_personas
 *               - capacidad_colectiva
 *               - cantidad_familias
 *               - ocupacion
 *               - egresos
 *               - sospechosos_sanos
 *             properties:
 *               id:
 *                 type: integer
 *               capacidad_personas:
 *                 type: integer
 *               capacidad_colectiva:
 *                 type: integer
 *               cantidad_familias:
 *                 type: integer
 *               ocupacion:
 *                 type: integer
 *               egresos:
 *                 type: integer
 *               sospechosos_sanos:
 *                 type: integer
 *               otros:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro actualizado correctamente
 *       400:
 *         description: Faltan campos obligatorios
 *       500:
 *         description: Error al actualizar el registro
 */
router.put('/', putMethod);

/**
 * @swagger
 * /api/capacidadAlbergues/id/{id}:
 *   delete:
 *     tags:
 *       - Capacidad Albergues
 *     summary: Eliminar una capacidad de albergue por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la capacidad a eliminar
 *     responses:
 *       200:
 *         description: Registro eliminado correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar el registro
 */
router.delete('/id/:id', deleteMethod);

module.exports = router;
