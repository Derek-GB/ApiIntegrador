// Auth/auth.route.js
const { Router } = require('express');
const AuthController = require('./auth.controller');
//const TokenMaintenance = require('../Auth/TokenMaintenance'); // Asegúrate de que la ruta sea correcta
const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Iniciar sesión con correo/usuario y contraseña
 *     description: Permite login usando correo electrónico O nombre de usuario junto con la contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contrasena
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: usuario@email.com
 *                 description: Correo electrónico del usuario (requerido si no se envía 'usuario')
 *               usuario:
 *                 type: string
 *                 example: miUsuario123
 *                 description: Nombre de usuario (requerido si no se envía 'correo')
 *               contrasena:
 *                 type: string
 *                 example: "miContrasena123"
 *                 description: Contraseña del usuario
 *           examples:
 *             loginPorCorreo:
 *               summary: Login con correo electrónico
 *               value:
 *                 correo: "usuario@example.com"
 *                 contrasena: "miContrasena123"
 *             loginPorUsuario:
 *               summary: Login con nombre de usuario
 *               value:
 *                 usuario: "miUsuario123"
 *                 contrasena: "miContrasena123"
 *     responses:
 *       200:
 *         description: Autenticación exitosa
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
 *                   example: "Login exitoso"
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nombreUsuario:
 *                       type: string
 *                       example: "miUsuario123"
 *                     correo:
 *                       type: string
 *                       example: "usuario@example.com"
 *                     rol:
 *                       type: string
 *                       example: "usuario"
 *                     idMunicipalidad:
 *                       type: integer
 *                       nullable: true
 *                       example: 1
 *       400:
 *         description: Correo/usuario o contraseña faltante
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
 *                   example: "Correo/usuario y contraseña son requeridos"
 *       401:
 *         description: Usuario no encontrado o contraseña incorrecta
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
 *                   example: "Credenciales inválidas"
 *       500:
 *         description: Error interno del servidor
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /api/auth/validate:
 *   get:
 *     tags:
 *       - Autenticación
 *     summary: Verificar validez de token JWT
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token inválido o no proporcionado
 */
router.get('/validate', AuthController.verifyToken, (req, res) => {
    res.json({
        success: true,
        message: 'Token válido',
        usuario: req.usuario
    });
});

// ==================== RUTAS PROTEGIDAS (REQUIEREN TOKEN) ====================
// Aplicar middleware de autenticación a todas las rutas siguientes
router.use(AuthController.verifyToken);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Registrar un nuevo usuario (Solo administradores)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreUsuario
 *               - correo
 *               - contrasena
 *             properties:
 *               nombreUsuario:
 *                 type: string
 *                 example: admin123
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               contrasena:
 *                 type: string
 *                 example: "123456"
 *               rol:
 *                 type: string
 *                 enum: [usuario, admin]
 *                 example: usuario
 *               idMunicipalidad:
 *                 type: integer
 *                 nullable: true
 *                 example: 1
 *               identificacion:
 *                 type: string
 *                 nullable: true
 *                 example: "506290123"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Faltan campos obligatorios
 *       401:
 *         description: Token no válido
 *       403:
 *         description: Acceso denegado - Se requiere rol de administrador
 *       409:
 *         description: El usuario ya existe
 *       500:
 *         description: Error interno del servidor
 */

router.post('/register', (req, res, next) => {
    if (req.usuario.rol !== 'admin') {
        return res.status(403).json({
            success: false,
            error: 'Acceso denegado. Se requiere rol de administrador'
        });
    }
    next();
}, AuthController.register);

module.exports = router;