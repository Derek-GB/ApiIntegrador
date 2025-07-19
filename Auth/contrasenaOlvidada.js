// Auth/PasswordRecoveryController.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { pool } = require('../MySQL/basedatos');
const AuthController = require('./auth.controller');

class contrasenaController {

    // ==================== ENDPOINTS PÚBLICOS ====================

    // Validar correo 
    static validateEmail(req, res) {
        const { correo } = req.body;

        // Validar que se envíe el correo
        if (!correo) {
            return res.status(400).json({
                success: false,
                error: 'Correo electrónico es requerido'
            });
        }

        // Validar formato de correo básico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            return res.status(400).json({
                success: false,
                error: 'Formato de correo electrónico inválido'
            });
        }

        // Verificar si el usuario existe y está activo
        AuthController.findUserByEmail(correo, (error, usuario) => {
            if (error) {
                console.error('Error en validateEmail:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Error interno del servidor'
                });
            }

            if (!usuario) {
                // Por seguridad, no revelamos si el correo existe o no
                return res.json({
                    success: true,
                    message: 'Si el correo está registrado, deberías recibir un código de verificación',
                    emailExists: false // Para uso interno del frontend
                });
            }

            // Si existe, devolver éxito
            res.json({
                success: true,
                message: 'Correo válido, puedes proceder con el código de verificación',
                emailExists: true,
                userId: usuario.id, // Para usar en el siguiente paso
                nombreUsuario: usuario.nombreUsuario // Para personalizar el mensaje
            });
        });
    }

    // Cambiar contraseña con código de verificación 
    static changePasswordWithCode(req, res) {
        const { correo, codigo, nuevaContrasena } = req.body;

        // Validar que se envíen todos los datos
        if (!correo || !codigo || !nuevaContrasena) {
            return res.status(400).json({
                success: false,
                error: 'Correo, código y nueva contraseña son requeridos'
            });
        }

        // Validar longitud mínima de contraseña
        if (nuevaContrasena.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'La nueva contraseña debe tener al menos 6 caracteres'
            });
        }

        // Validar formato de correo básico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            return res.status(400).json({
                success: false,
                error: 'Formato de correo electrónico inválido'
            });
        }

        // Verificar que el usuario existe y está activo
        AuthController.findUserByEmail(correo, (error, usuario) => {
            if (error) {
                console.error('Error buscando usuario:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Error interno del servidor'
                });
            }

            if (!usuario) {
                return res.status(400).json({
                    success: false,
                    error: 'Usuario no encontrado o inactivo'
                });
            }

            // Hashear la nueva contraseña
            AuthController.hashPassword(nuevaContrasena, (error, hashedPassword) => {
                if (error) {
                    console.error('Error hasheando contraseña:', error);
                    return res.status(500).json({
                        success: false,
                        error: 'Error interno del servidor'
                    });
                }

                // Actualizar la contraseña en la base de datos
                const query = 'UPDATE Usuario SET contrasenaHash = ?, ultimaActualizacion = NOW() WHERE id = ?';
                
                pool.query(query, [hashedPassword, usuario.id], (error, results) => {
                    if (error) {
                        console.error('Error actualizando contraseña:', error);
                        return res.status(500).json({
                            success: false,
                            error: 'Error interno del servidor'
                        });
                    }

                    // Revocar todos los refresh tokens del usuario por seguridad
                    AuthController.revokeUserRefreshTokens(usuario.id, (tokenError) => {
                        if (tokenError) {
                            console.error('Error revocando tokens:', tokenError);
                            // No fallar la operación si hay error con los tokens
                        }

                        res.json({
                            success: true,
                            message: 'Contraseña actualizada exitosamente'
                        });
                    });
                });
            });
        });
    }
}

module.exports = contrasenaController