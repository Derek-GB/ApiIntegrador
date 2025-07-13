const {Router}=require('express');

const router=Router();


const {
  getMethod,
  postMethod,
  validarCorreoMethod,
  putMethod,
  putContrasenaMethod,
  getAllMethod,
  deleteMethod}=require('../controllers/usuarios');

  /**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener un usuario por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener usuario (Contactar equipo de API)
 */
//Devolver datos desde mi API
router.get('/id/:id',   getMethod);


/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Insertar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreUsuario
 *               - correo
 *               - contrasenaHash
 *             properties:
 *               nombreUsuario:
 *                 type: string
 *               correo:
 *                 type: string
 *               contrasenaHash:
 *                 type: string
 *               rol:
 *                 type: string
 *               activo:
 *                 type: boolean
 *               idMunicipalidad:
 *                 type: integer
 *               identificacion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario insertado correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al insertar usuario (Contactar equipo de API)
 */
//Registrar o insertar
router.post('/',  postMethod);

/**
 * @swagger
 * /api/usuarios/validar/correo:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Validar si el correo ya está en uso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Correo válido y disponible
 *       400:
 *         description: Correo ya en uso
 *       500:
 *         description: Error al validar correo (Contactar equipo de API)
 */
router.post('/validar/correo', validarCorreoMethod);

/**
 * @swagger
 * /api/usuarios:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Actualizar un usuario existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - nombreUsuario
 *               - correo
 *               - contrasenaHash
 *               - rol
 *               - activo
 *               - idMunicipalidad
 *               - identificacion
 *             properties:
 *               id:
 *                 type: integer
 *               nombreUsuario:
 *                 type: string
 *               correo:
 *                 type: string
 *               contrasenaHash:
 *                 type: string
 *               rol:
 *                 type: string
 *               activo:
 *                 type: boolean
 *               idMunicipalidad:
 *                 type: integer
 *               identificacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al actualizar usuario (Contactar equipo de API)
 */

//Registrar o insertar
router.put('/',  putMethod);

/**
 * @swagger
 * /api/usuarios/contrasena:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Actualizar la contraseña de un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - nuevaContrasena
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *               nuevaContrasena:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al actualizar contraseña (Contactar equipo de API)
 */
router.put('/contrasena',  putContrasenaMethod);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     tags:
 *       - Usuarios
 *     summary: Eliminar un usuario por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar usuario (Contactar equipo de API)
 */
//Eliminar
router.delete('/id/:id', deleteMethod);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       500:
 *         description: Error al obtener usuarios (Contactar equipo de API)
 */
//Actualizar
router.get('/all',   getAllMethod);


module.exports=router;