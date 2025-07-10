// Auth/auth.route.js
const { Router } = require('express');
const AuthController = require('./auth.controller'); // Ajusta la ruta según tu estructura

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Autenticación
 *     description: Operaciones relacionadas con el login y registro de usuarios
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Iniciar sesión y obtener token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - contrasena
 *             properties:
 *               correo:
 *                 type: string
 *                 example: usuario@email.com
 *               contrasena:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *       400:
 *         description: Correo o contraseña faltante
 *       401:
 *         description: Usuario no encontrado o contraseña incorrecta
 *       403:
 *         description: Cuenta inactiva
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para login (pública)
router.post('/login', AuthController.login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Registrar un nuevo usuario
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
 *       409:
 *         description: El usuario ya existe
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para registro (pública) - opcional
router.post('/register', AuthController.register);


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
// Opcional: Ruta para validar token (protegida)
router.get('/validate', require('../middleware/verificarToken'), (req, res) => {
    res.json({
        success: true,
        message: 'Token válido',
        usuario: req.usuario
    });
});


module.exports = router;