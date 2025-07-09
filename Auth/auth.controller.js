// Auth/AuthController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../MySQL/basedatos'); // Ajusta la ruta según tu estructura
const { SECRET_KEY, TOKEN_EXPIRES_IN } = process.env;

class AuthController {
    static async login(req, res) {
        const { correo, contrasena } = req.body;

        try {
            // Validar que se envíen los datos requeridos
            if (!correo || !contrasena) {
                return res.status(400).json({ 
                    success: false,
                    error: 'Correo y contraseña son requeridos' 
                });
            }

            // 1. Buscar usuario por correo en la base de datos real
            // ERROR CORREGIDO: LIMIT 0 -> LIMIT 1
            const query = 'CALL `railway`.`pa_LoginUsuario`(?,?)';

            pool.query(query, [correo, contrasena], async (error, results) => {
                if (error) {
                    console.error('Error en consulta de usuario:', error);
                    return res.status(500).json({ 
                        success: false,
                        error: 'Error interno del servidor' 
                    });
                }

                // Verificar si el usuario existe
                if (results.length === 0) {
                    return res.status(401).json({ 
                        success: false,
                        error: 'Usuario no encontrado' 
                    });
                }
                console.log('Resultados de la consulta:', results);
                const usuario = results[0];

                // // 2. Verificar si el usuario está activo
                // if (!usuario.activo) {
                //     return res.status(403).json({ 
                //         success: false,
                //         error: 'Cuenta inactiva' 
                //     });
                // }

                // // 3. Validar contraseña
                // // ERROR CORREGIDO: contrasen -> contrasenaHash (según tu esquema de BD)
                // let contrasenaValida = false;
                
                // // Verificar si la contraseña está hasheada
                // if (usuario.contrasenaHash && usuario.contrasenaHash.startsWith('$2')) {
                //     // Contraseña hasheada con bcrypt
                //     contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasenaHash);
                // } else if (usuario.contrasenaHash) {
                //     // Contraseña en texto plano (temporal - deberías hashear)
                //     contrasenaValida = (contrasena === usuario.contrasenaHash);
                // } else {
                //     console.error('Campo de contraseña no encontrado en usuario:', Object.keys(usuario));
                //     return res.status(500).json({ 
                //         success: false,
                //         error: 'Error en estructura de usuario' 
                //     });
                // }

                // if (!contrasenaValida) {
                //     // Agregar logs para debug
                //     console.log('Contraseña enviada:', contrasena);
                //     console.log('Hash en BD:', usuario.contrasenaHash);
                //     console.log('Comparación válida:', contrasenaValida);
                    
                //     return res.status(401).json({ 
                //         success: false,
                //         error: 'Contraseña incorrecta' 
                //     });
                // }

                // 4. Actualizar última sesión
                const updateQuery = 'UPDATE Usuario SET ultimaSesion = NOW() WHERE id = ?';
                pool.query(updateQuery, [usuario.id], (updateError) => {
                    if (updateError) {
                        console.warn('Error actualizando última sesión:', updateError);
                    }
                });

                // 5. Generar token JWT
                const token = jwt.sign(
                    {
                        id: usuario.id,
                        correo: usuario.correo,
                        rol: usuario.rol,
                        nombreUsuario: usuario.nombreUsuario,
                        idMunicipalidad: usuario.idMunicipalidad || null
                    },
                    SECRET_KEY,
                    { expiresIn: TOKEN_EXPIRES_IN || '24h' }
                );

                // 6. Responder con token y datos básicos del usuario
                res.json({
                    success: true,
                    token,
                    usuario: {
                        id: usuario.id,
                        nombreUsuario: usuario.nombreUsuario,
                        rol: usuario.rol,
                        correo: usuario.correo,
                        idMunicipalidad: usuario.idMunicipalidad
                    }
                });
            });

        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ 
                success: false,
                error: 'Error interno del servidor' 
            });
        }
    }

    // Método para registro de usuarios
    static async register(req, res) {
    const { nombreUsuario, correo, contrasena, rol = 'usuario', idMunicipalidad, identificacion } = req.body;

    try {
        if (!nombreUsuario || !correo || !contrasena) {
            return res.status(400).json({
                success: false,
                error: 'Nombre de usuario, correo y contraseña son requeridos'
            });
        }

        // Verificar si el usuario ya existe
        const checkQuery = 'SELECT id FROM Usuario WHERE correo = ? LIMIT 1';
        pool.query(checkQuery, [correo], async (error, results) => {
            if (error) {
                console.error('Error verificando usuario:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Error interno del servidor'
                });
            }

            if (results.length > 0) {
                return res.status(409).json({
                    success: false,
                    error: 'El usuario ya existe'
                });
            }

            // Hashear la contraseña
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

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

                // Generar token JWT inmediatamente después del registro
                const token = jwt.sign(
                    {
                        id: nuevoUsuario.id,
                        correo: nuevoUsuario.correo,
                        rol: nuevoUsuario.rol,
                        nombreUsuario: nuevoUsuario.nombreUsuario,
                        idMunicipalidad: nuevoUsuario.idMunicipalidad
                    },
                    SECRET_KEY,
                    { expiresIn: TOKEN_EXPIRES_IN || '24h' }
                );

                // Responder con token y datos del usuario
                res.status(201).json({
                    success: true,
                    message: 'Usuario creado exitosamente',
                    token,
                    usuario: nuevoUsuario
                });
            });
        });

    } catch (error) {
        console.error('Error en register:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
}

    // Método para verificar token (middleware)
    static async verifyToken(req, res, next) {
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
}

module.exports = AuthController;