const {Router}= require('express');
const router=Router();
const productoController =require('../controllers/productoController');

  /**
 * @swagger
 * /api/productos/id/{id}:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtener un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: int
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: producto obtenido exitosamente
 *       404:
 *         description: producto no encontrado
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/id/:id', productoController.getProducto);   

/**
 * @swagger
 * /api/productos/all:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtener todos los productos
 *     responses:
 *       200:
 *         description: Lista de todos los productos
 *       500:
 *         description: Error al obtener los productos (Contactar equipo de API)
 */
router.get('/all', productoController.getAllProducto);             


/**
 * @swagger
 * /api/productos:
 *   post:
 *     tags:
 *       - Productos
 *     summary: Insertar un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigoProducto
 *               - nombre
 *               - cantidad
 *             properties:
 *               codigoProducto:
 *                 type: string
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               cantidad:
 *                 type: number
 *               categoria:
 *                 type: integer
 *               unidadMedida:
 *                 type: integer
 *               idAlbergue:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto insertado correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al insertar producto (Contactar equipo de API)
 */
router.post('/', productoController.postProducto);

/**
 * @swagger
 * /api/productos:
 *   put:
 *     tags:
 *       - Productos
 *     summary: Actualizar un producto
 *     description: Actualiza la información de un producto existente en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - descripcion
 *               - categoria
 *               - unidadMedida
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 10
 *               descripcion:
 *                 type: string
 *                 example: "Silla de oficina ergonómica"
 *               categoria:
 *                 type: string
 *                 example: "Muebles"
 *               unidadMedida:
 *                 type: string
 *                 example: "Unidad"
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente.
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
 *                   example: Todo salio bien
 *       400:
 *         description: Faltan parámetros obligatorios en el cuerpo de la petición.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Se esperaba el parametro id en la query
 *       500:
 *         description: Error interno al actualizar el producto.
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
 *                   example: Error al actualizar producto: Detalle del error
 */
router.put('/', productoController.putProducto);

/**
 * @swagger
 * /api/productos/id/{id}:
 *   delete:
 *     tags:
 *       - Productos
 *     summary: Eliminar un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: int
 *         required: true
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar el producto (Contactar equipo de API)
 */
router.delete('/id/:id', productoController.deleteProducto);

/**
 * @swagger
 * /api/productos/consulta/ProductosPorFamilia/{productoFamilia}:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtener productos por familia
 *     parameters:
 *       - in: path
 *         name: productoFamilia
 *         schema:
 *           type: string
 *         required: true
 *         description: Familia del producto a consultar
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente
 *       404:
 *         description: No se encontraron productos para la familia especificada
 *       500:
 *         description: Error al obtener productos por familia (Contactar equipo de API)
 */
router.get('/consulta/ProductosPorFamilia/:productoFamilia', productoController.getForProductoFamilia);

/**
 * @swagger
 * /api/productos/consulta/porUsuario/{idUsuario}:
 *   get:
 *     summary: Obtener producto por ID de usuario
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         description: ID del usuario para obtener el producto asociado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto de usuario obtenido exitosamente
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
 *                   example: Producto de usuario obtenido exitosamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     idProducto:
 *                       type: integer
 *                       example: 10
 *                     nombre:
 *                       type: string
 *                       example: "Kit de Higiene"
 *                     descripcion:
 *                       type: string
 *                       example: "Incluye jabón, pasta de dientes, papel higiénico"
 *                     cantidad:
 *                       type: integer
 *                       example: 3
 *       400:
 *         description: ID de usuario no proporcionado
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
 *                   example: Producto de familia es requerido
 *       404:
 *         description: Producto no encontrado para el usuario
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
 *                   example: Producto de usuario no encontrado
 *       500:
 *         description: Error al obtener producto de usuario
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
 *                   example: Error al obtener producto de usuario
 *                 error:
 *                   type: string
 *                   example: Error inesperado
 */
router.get('/consulta/porUsuario/:idUsuario', productoController.getAllProductoPorUsuario);

module.exports=router;