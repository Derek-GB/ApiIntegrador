const { Router } = require('express');
const router = Router();

const {
  getAllMethod,
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
} = require('../controllers/mascotas');

/**
 * @swagger
 * /api/mascotas/all:
 *   get:
 *     tags:
 *       - Mascotas
 *     summary: Obtener todas las mascotas
 *     responses:
 *       200:
 *         description: Lista de todas las mascotas
 *       500:
 *         description: Error al obtener mascotas (Contactar equipo de API)
 */
router.get('/all', getAllMethod);

/**
 * @swagger
 * /api/mascotas/id/{id}:
 *   get:
 *     tags:
 *       - Mascotas
 *     summary: Obtener una mascota por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: int
 *         required: true
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Mascota obtenida exitosamente
 *       404:
 *         description: Mascota no encontrada
 *       500:
 *         description: Error interno del servidor (Contactar equipo de API)
 */
router.get('/id/:id', getMethod);

/**
 * @swagger
 * /api/mascotas:
 *   post:
 *     tags:
 *       - Mascotas
 *     summary: Insertar una nueva mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idFamilia
 *               - tipo
 *               - tamaño
 *               - nombreMascota
 *             properties:
 *               idFamilia:
 *                 type: int
 *               tipo:
 *                 type: string
 *               tamaño:
 *                 type: string
 *               nombreMascota:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mascota insertada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al insertar mascota (Contactar equipo de API)
 */
router.post('/', postMethod);

/**
 * @swagger
 * /api/mascotas:
 *   put:
 *     tags:
 *       - Mascotas
 *     summary: Actualizar una mascota existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - idFamilia
 *               - tipo
 *               - tamaño
 *               - nombreMascota
 *             properties:
 *               id:
 *                 type: int
 *               idFamilia:
 *                 type: int
 *               tipo:
 *                 type: string
 *               tamaño:
 *                 type: string
 *               nombreMascota:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mascota actualizada correctamente
 *       400:
 *         description: Datos faltantes en el cuerpo de la solicitud
 *       500:
 *         description: Error al actualizar mascota (Contactar equipo de API)
 */
router.put('/', putMethod);

/**
 * @swagger
 * /api/mascotas/id/{id}:
 *   delete:
 *     tags:
 *       - Mascotas
 *     summary: Eliminar una mascota por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: int
 *         required: true
 *         description: ID de la mascota a eliminar
 *     responses:
 *       200:
 *         description: Mascota eliminada correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar la mascota (Contactar equipo de API)
 */
router.delete('/id/:id', deleteMethod);

module.exports = router;
