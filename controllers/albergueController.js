const { request, response } = require("express");
const albergueService = require("../service/albergueService");

// Obtener todos los albergues
const getAllAlbergues = async (req, res) => {
  try {
    const data = await albergueService.getAllAlbergues();
    res.status(200).json({
      success: true,
      data: data[0],
      message: "Albergues obtenidos exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los albergues",
      error: error.message,
    });
  }
};

// Obtener un albergue por ID
const getAlbergue = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID del albergue es requerido",
    });
  }
  try {
    const data = await albergueService.getAlbergue(id);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Albergue no encontrado",
      });
    }
    res.json({
      success: true,
      data,
      message: "Albergue obtenido exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el albergue",
      error: error.message,
    });
  }
};

// Eliminar un albergue por ID
const deleteAlbergue = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID del albergue es requerido",
    });
  }
  try {
    await albergueService.deleteAlbergue(id);
    res.json({
      success: true,
      message: `Albergue con ID ${id} eliminado correctamente`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar el albergue",
      error: error.message,
    });
  }
};

// Consultar albergue por ID (consulta extendida)
const getForIdAlbergue = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID del albergue es requerido",
    });
  }
  try {
    const data = await albergueService.getForIdAlbergue(id);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Albergue no encontrado",
      });
    }
    res.json({
      success: true,
      data,
      message: "Albergue obtenido exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el albergue",
      error: error.message,
    });
  }
};

// Consultar albergue por nombre
const getForNombreAlbergue = async (req = request, res = response) => {
  const { nombre } = req.params;
  if (!nombre) {
    return res.status(400).json({
      success: false,
      message: "Nombre del albergue es requerido",
    });
  }
  try {
    const data = await albergueService.getForNombreAlbergue(nombre);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Albergue no encontrado",
      });
    }
    res.json({
      success: true,
      data,
      message: "Albergue obtenido exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el albergue",
      error: error.message,
    });
  }
};

// Consultar albergue por distrito
const getForDistritoAlbergue = async (req = request, res = response) => {
  const { distrito } = req.params;
  if (!distrito) {
    return res.status(400).json({
      success: false,
      message: "Distrito del albergue es requerido",
    });
  }
  try {
    const data = await albergueService.getForDistritoAlbergue(distrito);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Albergue no encontrado",
      });
    }
    res.json({
      success: true,
      data,
      message: "Albergue obtenido exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el albergue",
      error: error.message,
    });
  }
};

// Consultar albergue por cantón
const getForCantonAlbergue = async (req = request, res = response) => {
  const { canton } = req.params;
  if (!canton) {
    return res.status(400).json({
      success: false,
      message: "Cantón del albergue es requerido",
    });
  }
  try {
    const data = await albergueService.getForCantonAlbergue(canton);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Albergue no encontrado",
      });
    }
    res.json({
      success: true,
      data,
      message: "Albergue obtenido exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el albergue",
      error: error.message,
    });
  }
};

// Consultar albergue por provincia
const getForProvinciaAlbergue = async (req = request, res = response) => {
  const { provincia } = req.params;
  if (!provincia) {
    return res.status(400).json({
      success: false,
      message: "Provincia del albergue es requerida",
    });
  }
  try {
    const data = await albergueService.getForProvinciaAlbergue(provincia);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Albergue no encontrado",
      });
    }
    res.json({
      success: true,
      data,
      message: "Albergue obtenido exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el albergue",
      error: error.message,
    });
  }
};

/**
 * Ejemplo de método POST (crear albergue)
 * Debes implementar el método en tu modelo y service para que funcione.
 */
// const createAlbergue = async (req = request, res = response) => {
//   try {
//     const albergueData = req.body;
//     // Aquí llamas a tu service/model para insertar el albergue
//     const result = await albergueService.createAlbergue(albergueData);
//     res.status(201).json({
//       success: true,
//       message: "Albergue creado correctamente",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error al crear el albergue",
//       error: error.message,
//     });
//   }
// };


const getResumenAlberguesColor = async (req = request, res = response) => {
  const { Color } = req.params;
  if (!Color) {
    return res.status(400).json({
      success: false,
      message: "Color del albergue es requerido",
    });
  }
  try {
    const data = await albergueService.getResumenAlberguesColor(Color);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Color de albergue no encontrado",
      });
    }
    res.json({
      success: true,
      data,
      message: "Color de albergue obtenido exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el albergue",
      error: error.message,
    });
  }
};

/**
 * Método PUT para actualizar un albergue
 * Debes tener el método updateAlbergue en tu modelo y service.
 */
// const updateAlbergue = async (req = request, res = response) => {
//   const { id } = req.params;
//   const albergueData = req.body;
//   if (!id) {
//     return res.status(400).json({
//       success: false,
//       message: "ID del albergue es requerido",
//     });
//   }
//   try {
//     // Debes implementar updateAlbergue en tu modelo y service
//     const result = await albergueService.updateAlbergue(id, albergueData);
//     res.json({
//       success: true,
//       message: "Albergue actualizado correctamente",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error al actualizar el albergue",
//       error: error.message,
//     });
//   }
// };

// const putMethod = (req = request, res = response) => {
//   const { id } = req.body;
//   const {
//     idAlbergue,
//     nombre,
//     region,
//     coordenadaX,
//     coordenadaY,
//     idUbicacion,
//     tipo_establecimiento,
//     tipo_albergue,
//     condicion_albergue,
//     especificacion,
//     detalle_condicion,
//     administrador,
//     telefono,
//     idCapacidad,
//     seccion,
//     requerimientos_tecnicos,
//     costo_requerimientos_tecnicos,
//     idInfraestructura,
//     idMunicipalidad,
//     color,
//     idPedidoAbarrote,
//     idUsuarioModificacion,
//   } = req.body;

//   if (!idAlbergue || !nombre || !region || coordenadaX) {
//     return res.status(400).json({
//       success: false,
//       message: "Faltan datos: idalbergue, ",
//     });
//   }

//   pool.query(
//     "CALL pa_UpdateAlbergue(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
//     [id, codigoProducto, nombre, descripcion, cantidad],
//     (error, results) => {
//       if (error) {
//         console.error("Error al actualizar producto:", error);
//         return res.status(500).json({
//           success: false,
//           error: "Error al actualizar producto",
//         });
//       }

//       res.status(200).json({
//         success: true,
//         message: "Producto actualizado correctamente",
//         data: {
//           codigoProducto,
//           nombre,
//           descripcion,
//           cantidad,
//         },
//       });
//     }
//   );
// };
const postAlbergue = async (req, res) => {
    const {
        idAlbergue,
        nombre,
        region,
        coordenadaX,
        coordenadaY,
        idUbicacion,
        tipo_establecimiento,
        tipo_albergue,
        condicion_albergue,
        especificacion,
        detalle_condicion,
        administrador,
        telefono,
        idCapacidad,
        seccion,
        requerimientos_tecnicos,
        costo_requerimientos_tecnicos,
        idInfraestructura,
        idMunicipalidad,
        color,
        idPedidoAbarrote,
        idUsuarioCreacion,
        idUsuarioModificacion
    } = req.body;

    // Validación de campos obligatorios
    if (!idAlbergue || !nombre || !region || coordenadaX == null 
      || coordenadaY == null || !tipo_establecimiento || !tipo_albergue 
      || !condicion_albergue || !idUbicacion || !idCapacidad || !idInfraestructura || !idMunicipalidad) {
        return res.status(400).json({
            success: false,
            message: "Faltan datos obligatorios"
        });
    }

    // Valores opcionales con valor null por defecto
    especificacion = especificacion ?? null;
    detalle_condicion = detalle_condicion ?? null;
    administrador = administrador ?? null;
    telefono = telefono ?? null;
    seccion = seccion ?? null;
    requerimientos_tecnicos = requerimientos_tecnicos ?? null;
    costo_requerimientos_tecnicos = costo_requerimientos_tecnicos ?? null;
    color = color ?? null;
    idPedidoAbarrote = idPedidoAbarrote ?? null;
    idUsuarioCreacion = idUsuarioCreacion ?? null;
    idUsuarioModificacion = idUsuarioModificacion ?? idUsuarioCreacion; 

    try {
        const result = await albergueService.postAlbergue(req.body);
        res.status(201).json({
            success: true,
            message: "Albergue insertado correctamente",
            data: result
        });
    } catch (error) {
        console.error("Error al insertar albergue:", error);
        res.status(500).json({
            success: false,
            error: "Error al insertar albergue",
            details: error.message
        });
    }
};





// const putMethod = (req = request, res = response) => {
//   const { id } = req.body;
//   const {
//     idAlbergue,
//     nombre,
//     region,
//     coordenadaX,
//     coordenadaY,
//     idUbicacion,
//     tipo_establecimiento,
//     tipo_albergue,
//     condicion_albergue,
//     especificacion,
//     detalle_condicion,
//     administrador,
//     telefono,
//     idCapacidad,
//     seccion,
//     requerimientos_tecnicos,
//     costo_requerimientos_tecnicos,
//     idInfraestructura,
//     idMunicipalidad,
//     color,
//     idPedidoAbarrote,
//     idUsuarioModificacion,
//   } = req.body;

//   if (!idAlbergue || !nombre || !region || coordenadaX) {
//     return res.status(400).json({
//       success: false,
//       message: "Faltan datos: idalbergue, ",
//     });
//   }

//   pool.query(
//     "CALL pa_UpdateAlbergue(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
//     [id, codigoProducto, nombre, descripcion, cantidad],
//     (error, results) => {
//       if (error) {
//         console.error("Error al actualizar producto:", error);
//         return res.status(500).json({
//           success: false,
//           error: "Error al actualizar producto",
//         });
//       }

//       res.status(200).json({
//         success: true,
//         message: "Producto actualizado correctamente",
//         data: {
//           codigoProducto,
//           nombre,
//           descripcion,
//           cantidad,
//         },
//       });
//     }
//   );
// };



module.exports = {
  getAllAlbergues,
  getAlbergue,
  deleteAlbergue,
  getForIdAlbergue,
  getForNombreAlbergue,
  getForDistritoAlbergue,
  getForCantonAlbergue,
  getForProvinciaAlbergue,
  getResumenAlberguesColor,
  postAlbergue,
  
  
};