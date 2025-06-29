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
 *               - tipo_establecimiento
 *               - tipo_albergue
 *               - condicion_albergue
 *               - idCapacidad
 *               - idInfraestructura
 *               - idMunicipalidad
 *             properties:
 *               idAlbergue:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               region:
 *                 type: string
 *               coordenadaX:
 *                 type: number
 *               coordenadaY:
 *                 type: number
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
 *                 nullable: true
 *               detalle_condicion:
 *                 type: string
 *                 nullable: true
 *               administrador:
 *                 type: string
 *                 nullable: true
 *               telefono:
 *                 type: string
 *                 nullable: true
 *               idCapacidad:
 *                 type: integer
 *               seccion:
 *                 type: string
 *                 nullable: true
 *               requerimientos_tecnicos:
 *                 type: string
 *                 nullable: true
 *               costo_requerimientos_tecnicos:
 *                 type: number
 *                 nullable: true
 *               idInfraestructura:
 *                 type: integer
 *               idMunicipalidad:
 *                 type: integer
 *               color:
 *                 type: string
 *                 nullable: true
 *               idPedidoAbarrote:
 *                 type: integer
 *                 nullable: true
 *               idUsuarioCreacion:
 *                 type: integer
 *                 nullable: true
 *               idUsuarioModificacion:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Albergue insertado correctamente
 *       400:
 *         description: Faltan datos obligatorios
 *       409:
 *         description: Ya existe un albergue con ese ID
 *       500:
 *         description: Error al insertar albergue
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

/**
 * @swagger
 * /api/albergues/consulta/id/{id}:
 *   get:
 *     summary: Consultar albergue por ID
 *     tags: 
 *       - Albergues
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del albergue
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Albergue obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: ID no proporcionado
 *       404:
 *         description: Albergue no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/consulta/id/:id', getForIdMethod);

/**
 * @swagger
 * /api/albergues/consulta/nombre/{nombre}:
 *   get:
 *     summary: Consultar albergue por nombre
 *     tags:
 *       - Albergues
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         description: Nombre del albergue (codificado en URL si tiene espacios)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Albergue obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Nombre no proporcionado
 *       404:
 *         description: Albergue no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/consulta/nombre/:nombre', getForNombreMethod);

/**
 * @swagger
 * /api/albergues/consulta/distrito/{distrito}:
 *   get:
 *     summary: Consultar albergues por distrito
 *     tags:
 *       - Albergues
 *     parameters:
 *       - in: path
 *         name: distrito
 *         required: true
 *         description: Nombre del distrito (codificado si tiene espacios)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Albergues en el distrito obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Distrito no proporcionado
 *       404:
 *         description: Distrito no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/consulta/distrito/:distrito', getForDistritoMethod);

module.exports = router;
