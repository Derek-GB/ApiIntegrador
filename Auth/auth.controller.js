// Auth/Auth.Controller.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const usuarioModel = require("../models/usuarioModel");
const { SECRET_KEY } = process.env;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY no esta definida en las variables de entorno.");
}

class AuthController {

  async login(req, res) {
    try {
      const { correo, usuario, contrasena } = req.body;

      if (!contrasena) {
        return res.status(400).json({
          success: false,
          error: "Contraseña es requeridos",
        });
      }
      if (!correo && !usuario) {
        return res.status(400).json({
          success: false,
          error: "Correo o nombre de usuario es requeridos",
        });
      }

      const identificador = correo || usuario;
      const resultadoUsuario = await usuarioModel.validarCorreoMethod({
        correo: identificador,
      });

      if (!resultadoUsuario || resultadoUsuario.length === 0) {
        return res.status(401).json({
          success: false,
          error: "Credenciales inválidas",
        });
      }

      const usuarioEncontrado = resultadoUsuario[0];
      const contrasenaValida = await bcrypt.compare(
        contrasena,
        usuarioEncontrado.contrasenaHash
      );

      if (!contrasenaValida) {
        return res.status(401).json([
            success: false,
            error: 'Credenciales inválidas'
        ]);
      }
      if (!usuarioEncontrado.activo) {
        return res.status(401).json([
            success: false,
            error: 'Cuenta desactivada'
        ]);
      }

      const tokenpayload = {
        id: usuarioEncontrado.id,
        correo: usuarioEncontrado.correo,
        rol: usuarioEncontrado.rol,
        idMunicipalidad: usuarioEncontrado.idMunicipalidad
      };

      const token = jwt.sign(tokenpayload, SECRET_KEY, {
        expiresIn: '24h',
        issuer: 'auth-service',
        audience: 'api-users'
      });

      try {
        
      } catch (error) {
        console.log('No se pudo actualizar última sesión:', error.message);
      }

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/'
      };

      res.cookie('authToken', token, cookieOptions);
      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        accessToken: token,
        usuario: {
            id: usuarioEncontrado.id,
            nombreUsuario: usuarioEncontrado.nombreUsuario || usuarioEncontrado.nombre,
            correo: usuarioEncontrado.correo,
            rol: usuarioEncontrado.rol,
            idMunicipalidad: usuarioEncontrado.idMunicipalidad
        }
      });

    } catch (error) {
      console.error("Error en consulta de usuario:", error);
      return res.status(500).json({
        success: false,
        error: "Error interno del servidor",
      });
    }
  }

  async logout(req, res){
    try {
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });

        res.status(200).json([
            success: true,
            message: 'Sesión cerrada exitosamente'
        ]);

    } catch (error) {
        console.error('Error en logout:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        })
    }
  }

  async validateToken(req, res){
    res.json({
        success: true,
        message: 'Token válido',
        usuario: req.usuario
    });
  }

}

module.exports = new AuthController();
