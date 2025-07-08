// Auth/auth.route.js
const { Router } = require('express');
const AuthController = require('./auth.controller'); // Ajusta la ruta según tu estructura

const router = Router();

// Ruta para login (pública)
router.post('/login', AuthController.login);

// Ruta para registro (pública) - opcional
router.post('/register', AuthController.register);

// Opcional: Ruta para validar token (protegida)
router.get('/validate', require('../middleware/verificarToken'), (req, res) => {
    res.json({
        success: true,
        message: 'Token válido',
        usuario: req.usuario
    });
});


module.exports = router;