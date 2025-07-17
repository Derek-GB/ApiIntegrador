const { Router } = require('express');
const router = Router();

const {
  getAllMethod,
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
} = require('../controllers/nuevaInfraestructura');

/**
 * @swagger
 * /api/nuevaInfraestructura/all:
 *   get:
 *     tags:
 *       - nuevaInfraestructura
 *     summary: Obtener todas las infraestructuras
 *     responses:
 *       200:
 *         description: Lista de todas las infraestructuras
 *       500:
 *         description: Error al obtener infraestructuras (Contactar equipo de API)
 */
router.get('/all', getAllMethod);

/**
 * @swagger
 * /api/nuevaInfraestructura/id/{id}:
 *   get:
 *     tags:
 *       - nuevaInfraestructura
 *     summary: Obtener una infraestructura por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la infraestructura
 *     responses:
 *       200:
 *         description: Infraestructura obtenida exitosamente
 *       404:
 *         description: Infraestructura no encontrada
 *       500:
 *         description: Error interno del servidor (Contactar equipo de API)
 */
router.get('/id/:id', getMethod);

/**
 * @swagger
 * /api/nuevaInfraestructura:
 *   post:
 *     tags:
 *       - nuevaInfraestructura
 *     summary: Insertar nueva infraestructura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idAlbergue
 *               - fecha
 *               - motivo
 *               - tipo
 *               - descripcion
 *               - costoTotal
 *             properties:
 *               idAlbergue:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *               motivo:
 *                 type: string
 *               tipo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               costoTotal:
 *                 type: number
 *     responses:
 *       201:
 *         description: Infraestructura insertada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al insertar infraestructura (Contactar equipo de API)
 */
router.post('/', postMethod);

/**
 * @swagger
 * /api/nuevaInfraestructura:
 *   put:
 *     tags:
 *       - nuevaInfraestructura
 *     summary: Actualizar infraestructura existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - idAlbergue
 *               - fecha
 *               - motivo
 *               - tipo
 *               - descripcion
 *               - costoTotal
 *             properties:
 *               id:
 *                 type: integer
 *               idAlbergue:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *               motivo:
 *                 type: string
 *               tipo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               costoTotal:
 *                 type: number
 *     responses:
 *       200:
 *         description: Infraestructura actualizada correctamente
 *       400:
 *         description: Datos faltantes en el cuerpo de la solicitud
 *       500:
 *         description: Error al actualizar infraestructura (Contactar equipo de API)
 */
router.put('/', putMethod);

/**
 * @swagger
 * /api/nuevaInfraestructura/id/{id}:
 *   delete:
 *     tags:
 *       - nuevaInfraestructura
 *     summary: Eliminar infraestructura por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la infraestructura a eliminar
 *     responses:
 *       200:
 *         description: Infraestructura eliminada correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar infraestructura (Contactar equipo de API)
 */
router.delete('/id/:id', deleteMethod);


module.exports = router;
