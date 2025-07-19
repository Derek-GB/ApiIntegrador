const { request, response } = require('express');
const { pool } = require('../MySQL/basedatos')

const getAllMethod = async  (req = request, res = response) => {
    try {
    const [results] = await pool.query("CALL pa_SelectAllUsuario");

    res.json({
      success: true,
      data: results[0],
    });
  } catch (error) {
    console.error("Error en getAllUsuariosMethod:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener usuarios",
      details: error.message,
    });
  }

};

const getMethod = async  (req = request, res = response) => {
    const { id } = req.params;
    try {
    const [results] = await pool.query("CALL pa_SelectUsuario(?)", [id]);

    if (!results || results[0].length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.json({
      success: true,
      data: results[0][0],
    });
  } catch (error) {
    console.error("Error en getUsuarioByIdMethod:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener usuario",
      details: error.message,
    });
  }
};


const postMethod = async (req = request, res = response) => {
    let { nombreUsuario, correo, contrasenaHash, rol, activo, idMunicipalidad, identificacion } = req.body;

    if (!nombreUsuario || !correo || !contrasenaHash ) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos: nombreUsuario, correo, contrasenaHash '
        });
    }

    rol = rol ?? null; 
    activo = activo ?? null; 
    idMunicipalidad = idMunicipalidad ?? null; 
    identificacion = identificacion ?? null; 

    try {
    const [results] = await pool.query(
      "CALL pa_InsertUsuario(?, ?, ?, ?, ?, ?, ?)",
      [
        nombreUsuario,
        correo,
        contrasenaHash,
        rol,
        activo,
        idMunicipalidad,
        identificacion
      ]
    );

    res.status(201).json({
      success: true,
      message: "Usuario insertado correctamente",
      data: {
        id: results[0][0].id,
        nombreUsuario,
        correo,
        contrasenaHash,
        rol,
        activo,
        idMunicipalidad,
        identificacion
      }
    });
  } catch (error) {
    console.error("Error al insertar usuario:", error);
    res.status(500).json({
      success: false,
      error: "Error al insertar usuario",
      details: error.message
    });
  }
};

const validarCorreoMethod = async (req = request, res = response) => {
    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({
            success: false,
            message: 'Falta el correo'
        });
    }

    try {
    const [results] = await pool.query("CALL pa_ValidarCorreo(?)", [correo]);

    const existe = results?.[0]?.[0]?.existe;

    if (existe === 1) {
      return res.status(400).json({
        success: false,
        message: "El correo ya está en uso",
      });
    }

    res.json({
      success: true,
      message: "El correo es válido y está disponible",
    });
  } catch (error) {
    console.error("Error al validar correo:", error);
    res.status(500).json({
      success: false,
      error: "Error al validar correo",
      details: error.message,
    });
  }
};

const putMethod = (req = request, res = response) => {
    const {id} = req.body;
    const {nombreUsuario, correo, contrasenaHash, rol, activo, idMunicipalidad, identificacion } = req.body;

    if (!id || !nombreUsuario || correo == null || contrasenaHash == null || rol == null || activo == null || idMunicipalidad == null || identificacion == null) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos: nombreUsuario, correo, contrasenaHash, rol, activo, idMunicipalidad, identificacion'
        });
    }

    pool.query('CALL pa_UpdateUsuario(?, ?, ?, ?, ?, ?, ?)', [id, nombreUsuario, correo, contrasenaHash, rol, activo, idMunicipalidad, identificacion], (error, results) => {
        if (error) {
            console.error('Error al actualizar usuario:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al actualizar usuario'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producto actualizado correctamente',
            data: {
                id, nombreUsuario, correo, contrasenaHash, rol, activo, idMunicipalidad, identificacion
            }
        });
    });
};

const putContrasenaMethod = (req = request, res = response) => {
    const { correo, nuevaContrasena } = req.body;

    if (!correo || !nuevaContrasena) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos: correo, nuevaContrasena'
        });
    }

    pool.query('CALL pa_UpdateUsuarioContrasena(?, ?)', [correo, nuevaContrasena], (error, results) => {
        if (error) {
            console.error('Error al actualizar contraseña:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al actualizar contraseña'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contraseña actualizada correctamente'
        });
    });
};

const deleteMethod = (req = request, res = response) => {
    const { id } = req.params; 

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID de usuario no proporcionado en el body'
        });
    }

    pool.query('CALL pa_DeleteUsuario(?)', [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar usuario:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al eliminar usuario'
            });
        }

        res.json({
            success: true,
            message: `Usuario con ID ${id} eliminado correctamente`
        });
    });
};


module.exports = {
    getAllMethod,
    getMethod,
    postMethod,
    validarCorreoMethod,
    putMethod,
    putContrasenaMethod,
    deleteMethod
}