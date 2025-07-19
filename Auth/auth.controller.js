// Auth/AuthController.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../MySQL/basedatos');

console.log('=== DEBUG ENV ===');
console.log('SECRET_KEY:', process.env.SECRET_KEY);
console.log('PORT:', process.env.PORT);
console.log('=================');

const { SECRET_KEY } = process.env;

// Configuración de tokens (tiempos fijos)
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

class AuthController {
    // ==================== FUNCIONES DE UTILIDAD ====================

    // Generar tokens (access y refresh)
    static generateTokens(user) {
        const accessToken = jwt.sign(
            {
                id: user.id,
                correo: user.correo,
                rol: user.rol,
                nombreUsuario: user.nombreUsuario,
                idMunicipalidad: user.idMunicipalidad
            },
            SECRET_KEY,
            { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
        );

        const refreshToken = jwt.sign(
            {
                id: user.id,
                type: 'refresh'
            },
            SECRET_KEY,
            { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
        );

        return { accessToken, refreshToken };
    }

    // Buscar usuario por correo
    static findUserByEmail(correo, callback) {
        const query = 'SELECT * FROM Usuario WHERE correo = ? AND activo = 1';
        
        pool.query(query, [correo], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, results.length > 0 ? results[0] : null);
        });
    }

    // Buscar usuario por nombre de usuario
    static findUserByUsername(nombreUsuario, callback) {
        const query = 'SELECT * FROM Usuario WHERE nombreUsuario = ? AND activo = 1';
        
        pool.query(query, [nombreUsuario], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, results.length > 0 ? results[0] : null);
        });
    }

    // Buscar usuario por correo o nombre de usuario
    static findUserByEmailOrUsername(identifier, callback) {
        const query = 'SELECT * FROM Usuario WHERE (correo = ? OR nombreUsuario = ?) AND activo = 1';
        
        pool.query(query, [identifier, identifier], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, results.length > 0 ? results[0] : null);
        });
    }

    // Verificar contraseña
    static verifyPassword(plainPassword, hashedPassword, callback) {
        bcrypt.compare(plainPassword, hashedPassword, callback);
    }

    // Guardar refresh token en BD
    static saveRefreshToken(userId, refreshToken, callback) {
        // Calcular fecha de expiración (7 días desde ahora)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        const query = 'CALL pa_InsertToken(?, ?, ?)';
        
        pool.query(query, [userId, refreshToken, expiresAt], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, results);
        });
    }

    // Revocar refresh tokens anteriores del usuario
    static revokeUserRefreshTokens(userId, callback) {
        const query = 'UPDATE Token SET esActivo = 0 WHERE idUsuario = ? AND esActivo = 1';
        
        pool.query(query, [userId], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, results);
        });
    }

    // Obtener refresh tokens de un usuario
    static getUserRefreshTokens(userId, callback) {
        const query = 'CALL pa_SelectToken(?)';
        
        pool.query(query, [userId], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, results[0] || []);
        });
    }

    // Limpiar tokens expirados
    static cleanupExpiredTokens(callback) {
        const query = 'DELETE FROM Token WHERE fechaExpiracion < NOW()';
        
        pool.query(query, [], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, results);
        });
    }

    // Actualizar última sesión del usuario
    static updateLastSession(userId, callback) {
        const query = 'UPDATE Usuario SET ultimaSesion = NOW() WHERE id = ?';
        
        pool.query(query, [userId], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, results);
        });
    }

    // Buscar usuario por ID
    static findUserById(userId, callback) {
        const query = 'SELECT * FROM Usuario WHERE id = ? AND activo = 1';
        
        pool.query(query, [userId], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, results.length > 0 ? results[0] : null);
        });
    }

    // Hashear contraseña
    static hashPassword(password, callback) {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, callback);
    }

    // ==================== MÉTODOS DE AUTENTICACIÓN ====================

    static login(req, res) {
        const { correo, usuario, contrasena } = req.body;
        const identifier = correo || usuario;

        // Validar que se envíen los datos requeridos
        if (!identifier || !contrasena) {
            return res.status(400).json({
                success: false,
                error: 'Correo/usuario y contraseña son requeridos'
            });
        }

        // 1. Buscar usuario por correo o nombre de usuario
        AuthController.findUserByEmailOrUsername(identifier, (error, usuarioEncontrado) => {
            if (error) {
                console.error('Error buscando usuario:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Error interno del servidor'
                });
            }

            if (!usuarioEncontrado) {
                return res.status(401).json({
                    success: false,
                    error: 'Credenciales inválidas'
                });
            }

            // 2. Verificar contraseña
            AuthController.verifyPassword(contrasena, usuarioEncontrado.contrasenaHash, (error, isValidPassword) => {
                if (error) {
                    console.error('Error verificando contraseña:', error);
                    return res.status(500).json({
                        success: false,
                        error: 'Error interno del servidor'
                    });
                }

                if (!isValidPassword) {
                    return res.status(401).json({
                        success: false,
                        error: 'Credenciales inválidas'
                    });
                }

                // 3. Revocar refresh tokens anteriores
                AuthController.revokeUserRefreshTokens(usuarioEncontrado.id, (error) => {
                    if (error) {
                        console.error('Error revocando tokens:', error);
                        return res.status(500).json({
                            success: false,
                            error: 'Error interno del servidor'
                        });
                    }

                    // 4. Generar nuevos tokens
                    const { accessToken, refreshToken } = AuthController.generateTokens({
                        id: usuarioEncontrado.id,
                        correo: usuarioEncontrado.correo,
                        rol: usuarioEncontrado.rol,
                        nombreUsuario: usuarioEncontrado.nombreUsuario,
                        idMunicipalidad: usuarioEncontrado.idMunicipalidad
                    });

                    // 5. Guardar refresh token en BD
                    AuthController.saveRefreshToken(usuarioEncontrado.id, refreshToken, (error) => {
                        if (error) {
                            console.error('Error guardando token:', error);
                            return res.status(500).json({
                                success: false,
                                error: 'Error al generar tokens'
                            });
                        }

                        // 6. Actualizar última sesión
                        AuthController.updateLastSession(usuarioEncontrado.id, (error) => {
                            if (error) {
                                console.error('Error actualizando sesión:', error);
                                // No fallar por esto, solo log
                            }

                            // 7. Configurar cookie segura con refresh token
                            res.cookie('refreshToken', refreshToken, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === 'production',
                                sameSite: 'strict',
                                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
                            });

                            // 8. Responder con access token y datos básicos del usuario
                            res.json({
                                success: true,
                                message: 'Login exitoso',
                                accessToken,
                                usuario: {
                                    id: usuarioEncontrado.id,
                                    nombreUsuario: usuarioEncontrado.nombreUsuario,
                                    rol: usuarioEncontrado.rol,
                                    correo: usuarioEncontrado.correo,
                                    idMunicipalidad: usuarioEncontrado.idMunicipalidad
                                }
                            });
                        });
                    });
                });
            });
        });
    }

    static register(req, res) {
        const { nombreUsuario, correo, contrasena, rol = 'usuario', idMunicipalidad, identificacion } = req.body;

        if (!nombreUsuario || !correo || !contrasena) {
            return res.status(400).json({
                success: false,
                error: 'Nombre de usuario, correo y contraseña son requeridos'
            });
        }

        // Verificar si el usuario ya existe por correo
        AuthController.findUserByEmail(correo, (error, existingUserByEmail) => {
            if (error) {
                console.error('Error verificando correo:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Error interno del servidor'
                });
            }

            if (existingUserByEmail) {
                return res.status(409).json({
                    success: false,
                    error: 'Ya existe un usuario con este correo electrónico'
                });
            }

            // Verificar si el usuario ya existe por nombre de usuario
            AuthController.findUserByUsername(nombreUsuario, (error, existingUserByUsername) => {
                if (error) {
                    console.error('Error verificando nombre de usuario:', error);
                    return res.status(500).json({
                        success: false,
                        error: 'Error interno del servidor'
                    });
                }

                if (existingUserByUsername) {
                    return res.status(409).json({
                        success: false,
                        error: 'Ya existe un usuario con este nombre de usuario'
                    });
                }

                // Hashear la contraseña
                AuthController.hashPassword(contrasena, (error, hashedPassword) => {
                    if (error) {
                        console.error('Error hasheando contraseña:', error);
                        return res.status(500).json({
                            success: false,
                            error: 'Error interno del servidor'
                        });
                    }

                    // Insertar nuevo usuario
                    const insertQuery = `
                        INSERT INTO Usuario (nombreUsuario, correo, contrasenaHash, rol, activo, fechaCreacion, idMunicipalidad, identificacion) 
                        VALUES (?, ?, ?, ?, 1, NOW(), ?, ?)
                    `;

                    pool.query(insertQuery, [nombreUsuario, correo, hashedPassword, rol, idMunicipalidad, identificacion], (insertError, insertResults) => {
                        if (insertError) {
                            console.error('Error creando usuario:', insertError);
                            return res.status(500).json({
                                success: false,
                                error: 'Error al crear usuario'
                            });
                        }

                        // Datos del usuario recién creado
                        const nuevoUsuario = {
                            id: insertResults.insertId,
                            nombreUsuario,
                            correo,
                            rol,
                            idMunicipalidad: idMunicipalidad || null
                        };

                        // Generar tokens
                        const { accessToken, refreshToken } = AuthController.generateTokens(nuevoUsuario);

                        // Guardar refresh token en BD
                        AuthController.saveRefreshToken(nuevoUsuario.id, refreshToken, (error) => {
                            if (error) {
                                console.error('Error guardando token:', error);
                                return res.status(500).json({
                                    success: false,
                                    error: 'Error al generar tokens'
                                });
                            }

                            // Configurar cookie segura con refresh token
                            res.cookie('refreshToken', refreshToken, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === 'production',
                                sameSite: 'strict',
                                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
                            });

                            // Responder con access token y datos del usuario
                            res.status(201).json({
                                success: true,
                                message: 'Usuario creado exitosamente',
                                accessToken,
                                usuario: nuevoUsuario
                            });
                        });
                    });
                });
            });
        });
    }

    // Renovar Access Token
    static refreshToken(req, res) {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                error: 'Refresh token no encontrado'
            });
        }

        try {
            // Verificar el refresh token
            const decoded = jwt.verify(refreshToken, SECRET_KEY);

            // Verificar si el token existe en BD y está activo
            const query = 'CALL pa_SelectToken(?)';

            pool.query(query, [refreshToken], (error, results) => {
                if (error) {
                    console.error('Error verificando refresh token:', error);
                    return res.status(500).json({
                        success: false,
                        error: 'Error interno del servidor'
                    });
                }

                const tokenResults = results[0];
                if (!tokenResults || tokenResults.length === 0) {
                    return res.status(403).json({
                        success: false,
                        error: 'Refresh token inválido o expirado'
                    });
                }

                const tokenData = tokenResults[0];

                // Verificar que el token esté activo y no haya expirado
                if (!tokenData.activo || new Date() > new Date(tokenData.expires_at)) {
                    return res.status(403).json({
                        success: false,
                        error: 'Refresh token inválido o expirado'
                    });
                }

                // Buscar datos completos del usuario por ID
                AuthController.findUserById(decoded.id, (error, usuario) => {
                    if (error) {
                        console.error('Error buscando usuario:', error);
                        return res.status(500).json({
                            success: false,
                            error: 'Error interno del servidor'
                        });
                    }

                    if (!usuario) {
                        return res.status(403).json({
                            success: false,
                            error: 'Usuario no encontrado'
                        });
                    }

                    // Revocar el refresh token actual (rotación)
                    AuthController.revokeUserRefreshTokens(usuario.id, (error) => {
                        if (error) {
                            console.error('Error revocando tokens:', error);
                            return res.status(500).json({
                                success: false,
                                error: 'Error al renovar tokens'
                            });
                        }

                        // Generar nuevos tokens
                        const { accessToken, refreshToken: newRefreshToken } = AuthController.generateTokens({
                            id: usuario.id,
                            correo: usuario.correo,
                            rol: usuario.rol,
                            nombreUsuario: usuario.nombreUsuario,
                            idMunicipalidad: usuario.idMunicipalidad
                        });

                        // Guardar el nuevo refresh token
                        AuthController.saveRefreshToken(usuario.id, newRefreshToken, (error) => {
                            if (error) {
                                console.error('Error guardando nuevo token:', error);
                                return res.status(500).json({
                                    success: false,
                                    error: 'Error al renovar tokens'
                                });
                            }

                            // Actualizar cookie con nuevo refresh token
                            res.cookie('refreshToken', newRefreshToken, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === 'production',
                                sameSite: 'strict',
                                maxAge: 7 * 24 * 60 * 60 * 1000
                            });

                            // Responder con nuevo access token
                            res.json({
                                success: true,
                                accessToken,
                                usuario: {
                                    id: usuario.id,
                                    nombreUsuario: usuario.nombreUsuario,
                                    correo: usuario.correo,
                                    rol: usuario.rol,
                                    idMunicipalidad: usuario.idMunicipalidad
                                }
                            });
                        });
                    });
                });
            });

        } catch (jwtError) {
            console.error('Error verificando JWT:', jwtError);
            return res.status(403).json({
                success: false,
                error: 'Refresh token inválido'
            });
        }
    }

    // Logout
    static logout(req, res) {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            // Revocar el refresh token en BD
            const query = 'CALL pa_DeleteToken(?)';

            pool.query(query, [refreshToken], (error, results) => {
                if (error) {
                    console.error('Error revocando refresh token:', error);
                }
                // Continuar con la respuesta independientemente del error
                completeLogout();
            });
        } else {
            completeLogout();
        }

        function completeLogout() {
            // Limpiar cookie
            res.clearCookie('refreshToken');

            res.json({
                success: true,
                message: 'Sesión cerrada exitosamente'
            });
        }
    }

    // ==================== MÉTODOS DE VERIFICACIÓN ====================

    // Método para verificar access token (middleware)
    static verifyToken(req, res, next) {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');

            if (!token) {
                return res.status(401).json({
                    success: false,
                    error: 'Token de acceso requerido'
                });
            }

            const decoded = jwt.verify(token, SECRET_KEY);
            req.usuario = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                error: 'Token inválido'
            });
        }
    }

    // ==================== MÉTODOS DE GESTIÓN DE SESIONES ====================

    // Obtener sesiones activas del usuario
    static getUserSessions(req, res) {
        const userId = req.usuario.id;

        AuthController.getUserRefreshTokens(userId, (error, sessions) => {
            if (error) {
                console.error('Error obteniendo sesiones:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Error interno del servidor'
                });
            }

            // Formatear la respuesta para no exponer tokens completos
            const formattedSessions = sessions.map(session => ({
                id: session.id,
                created_at: session.created_at,
                expires_at: session.expires_at,
                activo: session.activo,
                // Solo mostrar primeros y últimos caracteres del token por seguridad
                token_preview: session.token.substring(0, 10) + '...' + session.token.substring(session.token.length - 10)
            }));

            res.json({
                success: true,
                sessions: formattedSessions
            });
        });
    }

    // Revocar una sesión específica
    static revokeSession(req, res) {
        const { sessionId } = req.params;
        const userId = req.usuario.id;

        // Primero verificar que la sesión pertenece al usuario
        AuthController.getUserRefreshTokens(userId, (error, sessions) => {
            if (error) {
                console.error('Error obteniendo sesiones:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Error interno del servidor'
                });
            }

            const session = sessions.find(s => s.id === parseInt(sessionId));

            if (!session) {
                return res.status(404).json({
                    success: false,
                    error: 'Sesión no encontrada'
                });
            }

            // Revocar la sesión específica
            const query = 'CALL pa_DeleteToken(?)';
            pool.query(query, [session.token], (error, results) => {
                if (error) {
                    console.error('Error revocando sesión:', error);
                    return res.status(500).json({
                        success: false,
                        error: 'Error interno del servidor'
                    });
                }

                res.json({
                    success: true,
                    message: 'Sesión revocada exitosamente'
                });
            });
        });
    }

    // Revocar todas las sesiones del usuario excepto la actual
    static revokeAllOtherSessions(req, res) {
        const userId = req.usuario.id;
        const currentRefreshToken = req.cookies.refreshToken;

        // Obtener todas las sesiones del usuario
        AuthController.getUserRefreshTokens(userId, (error, sessions) => {
            if (error) {
                console.error('Error obteniendo sesiones:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Error interno del servidor'
                });
            }

            // Filtrar sesiones que no sean la actual y estén activas
            const sessionsToRevoke = sessions.filter(session => 
                session.token !== currentRefreshToken && session.activo
            );

            if (sessionsToRevoke.length === 0) {
                return res.json({
                    success: true,
                    message: 'No hay otras sesiones activas para revocar'
                });
            }

            // Revocar todas las sesiones filtradas
            let completedRevocations = 0;
            let hasError = false;

            sessionsToRevoke.forEach(session => {
                const query = 'CALL pa_DeleteToken(?)';
                pool.query(query, [session.token], (error, results) => {
                    completedRevocations++;
                    
                    if (error) {
                        console.error('Error revocando sesión:', error);
                        hasError = true;
                    }

                    // Verificar si todas las revocaciones han completado
                    if (completedRevocations === sessionsToRevoke.length) {
                        if (hasError) {
                            return res.status(500).json({
                                success: false,
                                error: 'Error revocando algunas sesiones'
                            });
                        }

                        res.json({
                            success: true,
                            message: 'Todas las otras sesiones han sido revocadas'
                        });
                    }
                });
            });
        });
    }

    // ==================== MÉTODOS DE MANTENIMIENTO ====================

    // Programar limpieza de tokens
    static scheduleTokenCleanup() {
        setInterval(() => {
            AuthController.cleanupExpiredTokens((error, results) => {
                if (error) {
                    console.error('Error en limpieza de tokens:', error);
                } else {
                    console.log('Limpieza de tokens expirados completada');
                }
            });
        }, 24 * 60 * 60 * 1000); // 24 horas
    }
}

module.exports = AuthController;