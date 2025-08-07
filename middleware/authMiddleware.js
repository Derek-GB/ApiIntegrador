// authMiddleware.js - Middleware unificado con rutas públicas
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

if (!SECRET_KEY) {
    throw new Error('SECRET_KEY no está definida en las variables de entorno');
}

// Rutas que no requieren autenticación
const publicRoutes = [
    { method: 'PUT', path: '/api/usuarios/contrasena' },
    { method: 'POST', path: '/api/usuarios/validar/correo' },
    { method: 'POST', path: '/api/usuarios/login' },
    { method: 'POST', path: '/api/personas/' }
];

const authMiddleware = (req, res, next) => {
    // Verificar si la ruta actual está en la lista de rutas públicas
    const isPublicRoute = publicRoutes.some(route =>
        req.method === route.method && 
        (req.path === route.path || req.originalUrl === route.path)
    );

    if (isPublicRoute) {
        console.log(`Ruta pública detectada: ${req.method} ${req.path}`);
        return next(); // Saltar autenticación para rutas públicas
    }

    // Aplicar autenticación para rutas protegidas (lógica de verificarToken)
    try {
        let token;
        
        // Verificar si el token viene en cookies
        if (req.cookies && req.cookies.authToken) {
            token = req.cookies.authToken;
        } else {
            // Verificar si el token viene en headers
            const authHeader = req.headers.authorization || req.headers.Authorization;
            if (!authHeader?.startsWith('Bearer ')) {
                return res.status(401).json({
                    success: false,
                    error: 'Formato de token inválido. Use: Bearer <token>'
                });
            }
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Token de acceso requerido'
            });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        req.usuario = {
            id: decoded.id,
            correo: decoded.correo,
            rol: decoded.rol,
            idMunicipalidad: decoded.idMunicipalidad
        };

        next();

    } catch (error) {
        console.error('Error en authMiddleware:', error.message);

        let mensaje = 'Error de autenticación';

        if (error instanceof jwt.JsonWebTokenError) {
            mensaje = 'Token inválido';
        } else if (error instanceof jwt.TokenExpiredError) {
            mensaje = 'Token expirado';
        }

        return res.status(402).json({
            success: false,
            error: mensaje
        });
    }
};

module.exports = authMiddleware;