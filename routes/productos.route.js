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
//Devolver un solo producto por ID
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
//Devuelve todos los productos
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
 *              idAlbergue:
 *                type: integer
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
 *     summary: Actualizar un producto existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - descripcion
 *               - cantidad
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID del producto
 *               descripcion:
 *                 type: string
 *                 description: Nueva descripción del producto
 *               cantidad:
 *                 type: number
 *                 format: float
 *                 description: Nueva cantidad del producto
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       400:
 *         description: Datos inválidos o faltantes en la solicitud
 *       500:
 *         description: Error al actualizar producto (Contactar equipo de API)
 */
router.put('/',   productoController.putProducto);


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
// //Eliminar
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

module.exports=router;