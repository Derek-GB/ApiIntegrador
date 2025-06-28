const { Router } = require('express');
const router = Router();

const {
  getAllMethod,
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
} = require('../controllers/firmasDigitales');

/**
 * @swagger
 * /api/firmasDigitales/id/{id}:
 *   get:
 *     tags:
 *       - FirmasDigitales
 *     summary: Obtener una firma digital por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la firma
 *     responses:
 *       200:
 *         description: Firma obtenida correctamente
 *       400:
 *         description: Falta el ID
 *       404:
 *         description: Firma no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/id/:id', getMethod);

/**
 * @swagger
 * /api/firmasDigitales/all:
 *   get:
 *     tags:
 *       - FirmasDigitales
 *     summary: Obtener todas las firmas digitales
 *     responses:
 *       200:
 *         description: Lista de firmas obtenida correctamente
 *       500:
 *         description: Error al obtener firmas
 */
router.get('/all', getAllMethod);

/**
 * @swagger
 * /api/firmasDigitales:
 *   post:
 *     tags:
 *       - FirmasDigitales
 *     summary: Insertar una nueva firma digital
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firma
 *               - idPersona
 *             properties:
 *               firma:
 *                 type: string
 *               idPersona:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Firma insertada correctamente
 *       400:
 *         description: Datos faltantes o firma vacía
 *       500:
 *         description: Error al insertar
 */
router.post('/', postMethod);

/**
 * @swagger
 * /api/firmasDigitales:
 *   put:
 *     tags:
 *       - FirmasDigitales
 *     summary: Actualizar una firma digital existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - firma
 *               - idPersona
 *             properties:
 *               id:
 *                 type: integer
 *               firma:
 *                 type: string
 *               idPersona:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Firma actualizada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al actualizar
 */
router.put('/', putMethod);

/**
 * @swagger
 * /api/firmasDigitales/id/{id}:
 *   delete:
 *     tags:
 *       - FirmasDigitales
 *     summary: Eliminar una firma digital por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la firma
 *     responses:
 *       200:
 *         description: Firma eliminada correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar
 */
router.delete('/id/:id', deleteMethod);

module.exports = router;
