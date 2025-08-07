const { Router } = require('express');
const router = Router();
const amenazasController = require('../controllers/amenazasController');

/**
 * @swagger
 * /api/amenazas/id/{id}:
 *   get:
 *     tags:
 *       - Amenazas
 *     summary: Obtener una amenaza por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la amenaza
 *     responses:
 *       200:
 *         description: Amenaza obtenida exitosamente
 *       404:
 *         description: Amenaza no encontrada
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/id/:id', amenazasController.getAmenaza);

/**
 * @swagger
 * /api/amenazas/all:
 *   get:
 *     tags:
 *       - Amenazas
 *     summary: Obtener todas las amenazas
 *     responses:
 *       200:
 *         description: Lista de todas las amenazas
 *       500:
 *         description: Error al obtener las amenazas (Contactar equipo de API)
 */
router.get('/all', amenazasController.getAllAmenazas);

/**
 * @swagger
 * /api/amenazas:
 *   post:
 *     tags:
 *       - Amenazas
 *     summary: Registrar una nueva amenaza
 *     description: Inserta una nueva amenaza en la base de datos mediante un procedimiento almacenado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - familiaEvento
 *               - evento
 *             properties:
 *               familiaEvento:
 *                 type: string
 *                 example: Meteorológico
 *               evento:
 *                 type: string
 *                 example: Lluvias intensas
 *               peligro:
 *                 type: string
 *                 nullable: true
 *                 example: Inundación
 *               causa:
 *                 type: string
 *                 nullable: true
 *                 example: Lluvias continuas
 *               categoriaEvento:
 *                 type: string
 *                 nullable: true
 *                 example: Natural
 *               idUsuarioCreacion:
 *                 type: integer
 *                 nullable: true
 *                 example: 7
 *     responses:
 *       201:
 *         description: Amenaza insertada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Amenaza insertada correctamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 15
 *                     familiaEvento:
 *                       type: string
 *                       example: Meteorológico
 *                     evento:
 *                       type: string
 *                       example: Lluvias intensas
 *                     peligro:
 *                       type: string
 *                       example: Inundación
 *                     causa:
 *                       type: string
 *                       example: Lluvias continuas
 *                     categoriaEvento:
 *                       type: string
 *                       example: Natural
 *                     idUsuarioCreacion:
 *                       type: integer
 *                       example: 7
 *       400:
 *         description: Datos obligatorios no proporcionados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Los campos 'familiaEvento' y 'evento' son obligatorios
 *       500:
 *         description: Error al insertar amenaza
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error al insertar amenaza
 *                 error:
 *                   type: string
 *                   example: Error de conexión a la base de datos
 */
router.post('/', amenazasController.postAmenaza);

/**
 * @swagger
 * /api/amenazas:
 *   post:
 *     tags:
 *       - Amenazas
 *     summary: Insertar una nueva amenaza
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - familiaEvento
 *               - evento
 *             properties:
 *               familiaEvento:
 *                 type: string
 *               evento:
 *                 type: string
 *               peligro:
 *                 type: string
 *                 nullable: true
 *               idFamilia:
 *                 type: integer
 *                 nullable: true
 *               idUsuarioCreacion:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Amenaza insertada correctamente
 *       400:
 *         description: "Faltan datos: familiaEvento, evento"
 *       500:
 *         description: Error al insertar amenaza (Contactar equipo de API)
 */
// router.put('/', putAmenaza);

/**
 * @swagger
 * /api/amenazas/id/{id}:
 *   delete:
 *     tags:
 *       - Amenazas
 *     summary: Eliminar una amenaza por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la amenaza a eliminar
 *     responses:
 *       200:
 *         description: Amenaza eliminada correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar la amenaza (Contactar equipo de API)
 */
router.delete('/id/:id', amenazasController.deleteAmenaza);

module.exports = router;
