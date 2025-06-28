const { Router } = require('express');
const router = Router();

const {
  getAllMethod,
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
  getForIdMethod,
  getForNombreMethod,
  getForDistritoMethod,
} = require('../controllers/albergues');

/**
 * @swagger
 * /api/albergues/id/{id}:
 *   get:
 *     tags:
 *       - Albergues
 *     summary: Obtener un albergue por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del albergue
 *     responses:
 *       200:
 *         description: Albergue obtenido exitosamente
 *       404:
 *         description: Albergue no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/id/:id', getMethod);

/**
 * @swagger
 * /api/albergues/all:
 *   get:
 *     tags:
 *       - Albergues
 *     summary: Obtener todos los albergues
 *     responses:
 *       200:
 *         description: Lista de todos los albergues
 *       500:
 *         description: Error al obtener los albergues
 */
router.get('/all', getAllMethod);

/**
 * @swagger
 * /api/albergues:
 *   post:
 *     tags:
 *       - Albergues
 *     summary: Insertar un nuevo albergue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idAlbergue
 *               - nombre
 *               - region
 *               - coordenadaX
 *               - coordenadaY
 *               - idUbicacion
 *               - idCapacidad
 *               - idInfraestructura
 *               - idMunicipalidad
 *             properties:
 *               idAlbergue:
 *                 type: string
 *               nombre:
 *                 type: string
 *               region:
 *                 type: string
 *               coordenadaX:
 *                 type: integer
 *               coordenadaY:
 *                 type: integer
 *               idUbicacion:
 *                 type: integer
 *               tipo_establecimiento:
 *                 type: string
 *               tipo_albergue:
 *                 type: string
 *               condicion_albergue:
 *                 type: string
 *               especificacion:
 *                 type: string
 *               detalle_condicion:
 *                 type: string
 *               administrador:
 *                 type: string
 *               telefono:
 *                 type: string
 *               idCapacidad:
 *                 type: integer
 *               seccion:
 *                 type: string
 *               requerimientos_tecnicos:
 *                 type: string
 *               costo_requerimientos_tecnicos:
 *                 type: integer
 *               idInfraestructura:
 *                 type: integer
 *               idMunicipalidad:
 *                 type: integer
 *               color:
 *                 type: string
 *     responses:
 *       201:
 *         description: Albergue insertado correctamente
 *       400:
 *         description: Datos faltantes u obligatorios no proporcionados
 *       409:
 *         description: ID de albergue ya existente
 *       500:
 *         description: Error del servidor
 */
router.post('/', postMethod);

/**
 * @swagger
 * /api/albergues:
 *   put:
 *     tags:
 *       - Albergues
 *     summary: Actualizar un albergue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - codigoProducto
 *               - nombre
 *               - descripcion
 *               - cantidad
 *             properties:
 *               id:
 *                 type: integer
 *               codigoProducto:
 *                 type: string
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               cantidad:
 *                 type: number
 *     responses:
 *       200:
 *         description: Albergue actualizado correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al actualizar el albergue
 */
router.put('/', putMethod);

/**
 * @swagger
 * /api/albergues/id/{id}:
 *   delete:
 *     tags:
 *       - Albergues
 *     summary: Eliminar un albergue por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del albergue a eliminar
 *     responses:
 *       200:
 *         description: Albergue eliminado correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar el albergue
 */
router.delete('/id/:id', deleteMethod);


router.get('/consulta/id/:id', getForIdMethod);


router.get('/consulta/nombre/:nombre', getForNombreMethod);


router.get('/consulta/distrito/:distrito', getForDistritoMethod);

module.exports = router;
