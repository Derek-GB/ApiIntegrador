// authMiddleware.js - Middleware con rutas públicas excluidas
const jwt = require('jsonwebtoken');

// Rutas que no requieren autenticación
const publicRoutes = [
  { method: 'PUT', path: '/api/usuarios/contrasena' },
  { method: 'POST', path: '/api/usuarios/validar/correo' },
  { method: 'POST', path: '/api/usuarios/login' },
  { method: 'POST', path: '/api/personas' }
];

const authMiddleware = (req, res, next) => {
  // Verificar si la ruta actual está en la lista de rutas públicas
  const isPublicRoute = publicRoutes.some(route => 
    req.method === route.method && req.path === route.path
  );

  if (isPublicRoute) {
    return next(); // Saltar autenticación para rutas públicas
  }

  // Aplicar autenticación para rutas protegidas
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      error: 'Acceso denegado. Token no proporcionado.' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ 
      error: 'Token inválido.' 
    });
  }
};

module.exports = authMiddleware;

// Uso en app.js:
// app.use('/api/usuarios', authMiddleware, usuariosRoutes);