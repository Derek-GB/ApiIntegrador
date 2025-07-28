const { Router } = require('express');
const router = Router();

const albergueController = require('../controllers/albergueController');

// const {
//   postMethod,
// } = require('../controllers/formularioAlbergue');

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
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/id/:id', albergueController.getAlbergue);

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
 *         description: Error al obtener los albergues (Contactar equipo de API)
 */
router.get('/all', albergueController.getAllAlbergues);

/**
 * @swagger
 * /api/albergues:
 *   post:
 *     tags:
 *       - Albergues
 *     summary: Insertar albergue con datos completos (infraestructura, capacidad y ubicación)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cocina
 *               - duchas
 *               - serviciosSanitarios
 *               - bodega
 *               - menajeMobiliario
 *               - tanqueAgua
 *               - areaTotalM2
 *               - capacidadPersonas
 *               - capacidadColectiva
 *               - cantidadFamilias
 *               - ocupacion
 *               - egresos
 *               - sospechososSanos
 *               - provincia
 *               - canton
 *               - distrito
 *               - idAlbergue
 *               - nombre
 *               - region
 *               - coordenadaX
 *               - coordenadaY
 *               - tipoEstablecimiento
 *               - tipoAlbergue
 *               - condicionAlbergue
 *               - administrador
 *               - telefono
 *               - seccion
 *             properties:
 *               cocina:
 *                 type: boolean
 *               duchas:
 *                 type: boolean
 *               serviciosSanitarios:
 *                 type: boolean
 *               bodega:
 *                 type: boolean
 *               menajeMobiliario:
 *                 type: boolean
 *               tanqueAgua:
 *                 type: boolean
 *               areaTotalM2:
 *                 type: number
 *               capacidadPersonas:
 *                 type: integer
 *               capacidadColectiva:
 *                 type: integer
 *               cantidadFamilias:
 *                 type: integer
 *               ocupacion:
 *                 type: integer
 *               egresos:
 *                 type: integer
 *               sospechososSanos:
 *                 type: integer
 *               otros:
 *                 type: string
 *                 nullable: true
 *               provincia:
 *                 type: string
 *               canton:
 *                 type: string
 *               distrito:
 *                 type: string
 *               direccion:
 *                 type: string
 *                 nullable: true
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
 *               tipoEstablecimiento:
 *                 type: string
 *               tipoAlbergue:
 *                 type: string
 *               condicionAlbergue:
 *                 type: string
 *               especificacion:
 *                 type: string
 *                 nullable: true
 *               detalleCondicion:
 *                 type: string
 *                 nullable: true
 *               administrador:
 *                 type: string
 *               telefono:
 *                 type: string
 *               seccion:
 *                 type: string
 *               requerimientosTecnicos:
 *                 type: string
 *                 nullable: true
 *               costoRequerimientosTecnicos:
 *                 type: number
 *                 nullable: true
 *               idMunicipalidad:
 *                 type: integer
 *                 nullable: true
 *               color:
 *                 type: string
 *                 nullable: true
 *               idPedidoAbarrote:
 *                 type: integer
 *                 nullable: true
 *               idUsuarioCreacion:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Albergue registrado correctamente
 *       400:
 *         description: Faltan datos requeridos
 *       500:
 *         description: Error al insertar albergue
 */
// router.post('/', albergueController.postMethod);

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
 *         description: Error al actualizar el albergue (Contactar equipo de API)
 */
router.put('/', albergueController.putMethod);

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
 *         description: Error al eliminar el albergue (Contactar equipo de API)
 */
router.delete('/id/:id', albergueController.deleteAlbergue);

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
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/consulta/id/:id', albergueController.getForIdMethod);

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
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/consulta/nombre/:nombre', albergueController.getForNombreMethod);


/** * @swagger
 * /api/albergues/consulta/distrito/{distrito}:
 *   get:
 *     summary: Consultar albergue por distrito
 *     tags:
 *       - Albergues
 *     parameters:
 *       - in: path
 *         name: distrito
 *         required: true
 *         description: Distrito del albergue
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Albergue(s) obtenido(s) exitosamente
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
 */
router.get('/consulta/distrito/:distrito', albergueController.getForDistritoMethod);

/** * @swagger
 * /api/albergues/consulta/canton/{canton}:
 *   get:
 *     summary: Consultar albergue por cantón
 *     tags:
 *       - Albergues
 *     parameters:
 *       - in: path
 *         name: canton
 *         required: true
 *         description: Cantón del albergue
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Albergue(s) obtenido(s) exitosamente
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
 */
router.get('/consulta/canton/:canton', albergueController.getForCantonMethod);

/** * @swagger
 * /api/albergues/consulta/provincia/{provincia}:
 *   get:
 *     summary: Consultar albergue por provincia
 *     tags:
 *       - Albergues
 *     parameters:
 *       - in: path
 *         name: provincia
 *         required: true
 *         description: Provincia del albergue
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Albergue(s) obtenido(s) exitosamente
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
 */
router.get('/consulta/provincia/:provincia', albergueController.getForProvinciaMethod);

module.exports = router;
