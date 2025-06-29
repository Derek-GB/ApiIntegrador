const { Router } = require('express');
const router = Router();

const {
  getAllMethod,
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
} = require('../controllers/familias');

/**
 * @swagger
 * /api/familias/id/{id}:
 *   get:
 *     tags:
 *       - Familias
 *     summary: Obtener una familia por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la familia
 *     responses:
 *       200:
 *         description: Familia obtenida exitosamente
 *       404:
 *         description: Familia no encontrada
 *       500:
 *         description: Error al obtener familia
 */
router.get('/id/:id', getMethod);

/**
 * @swagger
 * /api/familias/all:
 *   get:
 *     tags:
 *       - Familias
 *     summary: Obtener todas las familias
 *     responses:
 *       200:
 *         description: Lista de familias
 *       500:
 *         description: Error al obtener familias
 */
router.get('/all', getAllMethod);

/**
 * @swagger
 * /api/familias:
 *   post:
 *     tags:
 *       - Familias
 *     summary: Insertar una nueva familia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigoFamilia
 *               - cantidadPersonas
 *               - idAlbergue
 *               - idUbicacion
 *               - idAmenaza
 *             properties:
 *               codigoFamilia:
 *                 type: string
 *               cantidadPersonas:
 *                 type: integer
 *               idAlbergue:
 *                 type: integer
 *               idUbicacion:
 *                 type: integer
 *               idAmenaza:
 *                 type: integer
 *               idPersona:
 *                 type: integer
 *                 nullable: true
 *               idUsuarioCreacion:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Familia insertada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al insertar familia
 */
router.post('/', postMethod);

/**
 * @swagger
 * /api/familias:
 *   put:
 *     tags:
 *       - Familias
 *     summary: Actualizar una familia existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - codigoFamilia
 *               - cantidadPersonas
 *               - idAlbergue
 *               - idUbicacion
 *               - idAmenaza
 *             properties:
 *               id:
 *                 type: string
 *               codigoFamilia:
 *                 type: string
 *               cantidadPersonas:
 *                 type: integer
 *               idAlbergue:
 *                 type: string
 *               idUbicacion:
 *                 type: string
 *               idAmenaza:
 *                 type: string
 *     responses:
 *       200:
 *         description: Familia actualizada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al actualizar familia
 */
router.put('/', putMethod);

/**
 * @swagger
 * /api/familias/id/{id}:
 *   delete:
 *     tags:
 *       - Familias
 *     summary: Eliminar una familia por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la familia a eliminar
 *     responses:
 *       200:
 *         description: Familia eliminada correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar familia
 */
router.delete('/id/:id', deleteMethod);

module.exports = router;
