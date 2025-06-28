const { Router } = require('express');
const router = Router();

const {
  getAllMethod,
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
} = require('../controllers/condicionesSalud');

/**
 * @swagger
 * /api/condicionesSalud/id/{id}:
 *   get:
 *     tags:
 *       - Condiciones Salud
 *     summary: Obtener una condición de salud por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la condición de salud
 *     responses:
 *       200:
 *         description: Condición de salud obtenida exitosamente
 *       404:
 *         description: Condición de salud no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/id/:id', getMethod);

/**
 * @swagger
 * /api/condicionesSalud/all:
 *   get:
 *     tags:
 *       - Condiciones Salud
 *     summary: Obtener todas las condiciones de salud
 *     responses:
 *       200:
 *         description: Lista de condiciones de salud obtenida correctamente
 *       500:
 *         description: Error al obtener los datos
 */
router.get('/all', getAllMethod);

/**
 * @swagger
 * /api/condicionesSalud:
 *   post:
 *     tags:
 *       - Condiciones Salud
 *     summary: Insertar una nueva condición de salud
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descripcion
 *               - idCondicionesEspeciales
 *             properties:
 *               descripcion:
 *                 type: string
 *               idCondicionesEspeciales:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Condición de salud insertada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al insertar
 */
router.post('/', postMethod);

/**
 * @swagger
 * /api/condicionesSalud:
 *   put:
 *     tags:
 *       - Condiciones Salud
 *     summary: Actualizar una condición de salud existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - descripcion
 *               - idCondicionesEspeciales
 *             properties:
 *               id:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               idCondicionesEspeciales:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Condición de salud actualizada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al actualizar
 */
router.put('/', putMethod);

/**
 * @swagger
 * /api/condicionesSalud/id/{id}:
 *   delete:
 *     tags:
 *       - Condiciones Salud
 *     summary: Eliminar una condición de salud por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la condición de salud a eliminar
 *     responses:
 *       200:
 *         description: Condición de salud eliminada correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar
 */
router.delete('/id/:id', deleteMethod);

module.exports = router;
