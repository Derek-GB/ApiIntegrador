const { request, response } = require('express');
const { pool } = require('../MySQL/basedatos');
const usuarioService = require('../service/usuarioService');

const getAllUsuarios = async (req, res) => {
  try{
    const data = await usuarioService.getAllUsuarios();
    res.status(200).json({
        success: true,
        data: data[0],
        message: "Usuarios obtenidos exitosamente",
    });
  }catch (error) {
    console.error("Error en getAllUsuarios:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los usuarios",
      error: error.message, // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
    });
  }
}
const getUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await usuarioService.getUsuario(id);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
            });
        }
        res.status(200).json({
            success: true,
            data: data,
            message: "Usuario obtenido exitosamente",
        });
    } catch (error) {
        console.error("Error en getUsuario:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: error.message, // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
        });
    }
}


const postUsuario = async (req, res) => {
    let { 
        nombreUsuario,
        correo,
        contrasenaHash,
        rol = null,
        activo = null,
        idMunicipalidad = null,
        identificacion = null
    } = req.body;

    try {
        const data = await usuarioService.postUsuario({nombreUsuario, correo, contrasenaHash, rol, activo, idMunicipalidad, identificacion});
        res.status(201).json({
                success: true,
                message: 'Usuario insertado correctamente',
                data: {
                    id: data[0][0].id,
                    nombreUsuario,
                    correo,
                    rol,
                    activo,
                    idMunicipalidad,
                    identificacion
                }
            });
    } catch (error) {
        console.error("Error en postMethodUsuarios:", error);
        res.status(500).json({
            success: false,
            message: "Error al insertar usuario",
            error: error.message, // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
        });
    }
}

const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID de usuario no proporcionado en el body'
        });
    }
    try {
        const data = await usuarioService.deleteUsuario(id);
        res.status(200).json({
            success: true,
            message: `Usuario con ID ${id} eliminado correctamente`,
            data: data
        });
    } catch (error) { 
        console.error("Error en deleteUsuario:", error);
        res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: error.message, // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
        });
    }
}
const validarCorreoMethod = async (req, res) => {
    const { correo } = req.body;
    if (!correo) {
        return res.status(400).json({
            success: false,
            message: 'Falta el correo'
        });
    }
    try {
        const data = await usuarioService.validarCorreoMethod(correo);
        if (data[0][0]?.existe === 1) {
            return res.status(200).json({
                success: false,
                message: 'El correo ya está en uso'
            });
        }
        res.status(200).json({
            success: true,
            message: 'El correo es válido y está disponible'
        });
    } catch (error) {
        console.error('Error al validar correo:', error);
        res.status(500).json({
            success: false,
            error: 'Error al validar correo'
        });
    }
}

const putContrasenaMethod = async (req, res) => {
    const { correo, nuevaContrasena } = req.body;
    if (!correo || !nuevaContrasena) {
        return res.status(400).json({   
            success: false,
            message: 'Faltan datos: correo, nuevaContrasena'
        });
    }
    try {
        const data = await usuarioService.putContrasenaMethod({correo, nuevaContrasena});
        res.status(200).json({
            success: true,
            message: 'Contraseña actualizada correctamente',
            data: data
        });
    } catch (error) {
        console.error('Error al actualizar contraseña:', error);
        res.status(500).json({
            success: false,
            error: 'Error al actualizar contraseña',
            message: error.message // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
        });
    }
}

const loginUsuario = (req = request, res = response) => {
  const { nombreUsuario, contrasena } = req.body;
  if (!nombreUsuario || !contrasena) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }
  const query = 'CALL pa_LoginUsuario(?, ?)';
  pool.query(query, [nombreUsuario, contrasena], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ message: 'Error del servidor' });
    }
    const usuario = results[0][0]; 
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    res.json({
      message: 'Login exitoso',
      usuario
    });
  });
};

module.exports = {
    getAllUsuarios,
    getUsuario,
    postUsuario,
    deleteUsuario,
    validarCorreoMethod,
    putContrasenaMethod,
    loginUsuario
}