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
        //console.log('Data de validarCorreoMethod:', data);
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




// const getAllMethod = (req = request, res = response) => {
//     pool.query('CALL pa_SelectAllUsuario', (error, results) => {
//         if (error) {
//             console.error('Error en getAllMethod:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al obtener usuarios'
//             });
//         }

//         res.json({
//             success: true,
//             data: results[0]
//         });
//     });
// };

// const getMethod = (req = request, res = response) => {
//     const { id } = req.params;
//     pool.query('CALL pa_SelectUsuario(?)', [id], (error, results) => {
//         if (error) {
//             console.error('Error en getMethod:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al obtener usuarios'
//             });
//         }

//         if (results[0].length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Usuario no encontrado'
//             });
//         }

//         res.json({
//             success: true,
//             data: results[0][0]
//         });
//     });
// };


// const postMethod = (req = request, res = response) => {
//     let { nombreUsuario, correo, contrasenaHash, rol, activo, idMunicipalidad, identificacion } = req.body;

//     if (!nombreUsuario || !correo || !contrasenaHash ) {
//         return res.status(400).json({
//             success: false,
//             message: 'Faltan datos: nombreUsuario, correo, contrasenaHash '
//         });
//     }

//     rol = rol ?? null; 
//     activo = activo ?? null; 
//     idMunicipalidad = idMunicipalidad ?? null; 
//     identificacion = identificacion ?? null; 

//     pool.query('CALL pa_InsertUsuario(?, ?, ?, ?, ?, ?, ?)', [nombreUsuario, correo, contrasenaHash, rol, activo, idMunicipalidad, identificacion], (error, results) => {
//         if (error) {
//             console.error('Error al insertar usuario:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al insertar usuario'
//             });
//         }

//         res.status(201).json({
//             success: true,
//             message: 'Usuario insertado correctamente',
//             data: {
//                 id: results[0][0]?.id ?? null,
//                 nombreUsuario, correo, contrasenaHash, rol, activo, idMunicipalidad, identificacion
//             }
//         });
//     });
// };

// const validarCorreoMethod = (req = request, res = response) => {
//     const { correo } = req.body;

//     if (!correo) {
//         return res.status(400).json({
//             success: false,
//             message: 'Falta el correo'
//         });
//     }

//     pool.query('CALL pa_ValidarCorreo(?)', [correo], (error, results) => {
//         if (error) {
//             console.error('Error al validar correo:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al validar correo'
//             });
//         }

//         // results[0] contiene el result set del SELECT dentro del procedimiento
//         const existe = results?.[0]?.[0]?.existe;

//         if (existe === 1) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'El correo ya está en uso'
//             });
//         }

//         res.json({
//             success: true,
//             message: 'El correo es válido y está disponible'
//         });
//     });
// };

// const putMethod = (req = request, res = response) => {
//     const {id} = req.body;
//     const {nombreUsuario, correo, contrasenaHash, rol, activo, idMunicipalidad, identificacion } = req.body;

//     if (!id || !nombreUsuario || correo == null || contrasenaHash == null || rol == null || activo == null || idMunicipalidad == null || identificacion == null) {
//         return res.status(400).json({
//             success: false,
//             message: 'Faltan datos: nombreUsuario, correo, contrasenaHash, rol, activo, idMunicipalidad, identificacion'
//         });
//     }

//     pool.query('CALL pa_UpdateUsuario(?, ?, ?, ?, ?, ?, ?)', [id, nombreUsuario, correo, contrasenaHash, rol, activo, idMunicipalidad, identificacion], (error, results) => {
//         if (error) {
//             console.error('Error al actualizar usuario:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al actualizar usuario'
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Producto actualizado correctamente',
//             data: {
//                 id, nombreUsuario, correo, contrasenaHash, rol, activo, idMunicipalidad, identificacion
//             }
//         });
//     });
// };

// const putContrasenaMethod = (req = request, res = response) => {
//     const { correo, nuevaContrasena } = req.body;

//     if (!correo || !nuevaContrasena) {
//         return res.status(400).json({
//             success: false,
//             message: 'Faltan datos: correo, nuevaContrasena'
//         });
//     }

//     pool.query('CALL pa_UpdateUsuarioContrasena(?, ?)', [correo, nuevaContrasena], (error, results) => {
//         if (error) {
//             console.error('Error al actualizar contraseña:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al actualizar contraseña'
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Contraseña actualizada correctamente'
//         });
//     });
// };

// const deleteMethod = (req = request, res = response) => {
//     const { id } = req.params; 

//     if (!id) {
//         return res.status(400).json({
//             success: false,
//             message: 'ID de usuario no proporcionado en el body'
//         });
//     }

//     pool.query('CALL pa_DeleteUsuario(?)', [id], (error, results) => {
//         if (error) {
//             console.error('Error al eliminar usuario:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al eliminar usuario'
//             });
//         }

//         res.json({
//             success: true,
//             message: `Usuario con ID ${id} eliminado correctamente`
//         });
//     });
// };


module.exports = {
    getAllUsuarios,
    getUsuario,
    postUsuario,
    deleteUsuario,
    validarCorreoMethod,
    putContrasenaMethod,
    loginUsuario
    // getAllMethod,
    // getMethod,
    // postMethod,
    // validarCorreoMethod,
    // putMethod,
    // putContrasenaMethod,
    // deleteMethod
}