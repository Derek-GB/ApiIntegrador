const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");


const getAllMethod = async (req = request, res = response) => {

  try {
    const results = await pool.query("CALL pa_SelectAllAlbergue");
    res.json({
      success: true,
      data: results[0],
    });
  } catch (error) {
    console.error("Error en getAllMethod:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener los albergues",
    });
  }
};

const getMethod = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID del albergue es requerido",
    });
  }
  try {
    const results = await pool.query("CALL pa_SelectAlbergue(?)", [id]);
    if (!results || !results[0] || results[0].length === 0) {
      return res.status(404).json({
        success: false,
        message: "Albergue no encontrado",
      });
    }
    res.json({
      success: true,
      message: "Albergue obtenido exitosamente",
      data: results[0][0],
    });
  } catch (error) {
    console.error("Error en getMethod:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener el albergue",
    });
};
}

// const getMethod = (req = request, res = response) => {
//   const { id } = req.params;
//   if (!id) {
//     return res.status(400).json({
//       success: false,
//       message: "ID del albergue es requerido",
//     });
//   }
//   pool.query("CALL pa_SelectAlbergue(?)", [id], (error, results) => {
//     if (error) {
//       console.error("Error en getMethod:", error);
//       return res.status(500).json({
//         success: false,
//         error: "Error al obtener el albergue",
//       });
//     }
//     if (!results || !results[0] || results[0].length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Albergue no encontrado",
//       });
//     }
//     res.json({
//       success: true,
//       message: "Albergue obtenido exitosamente",
//       data: results[0][0],
//     });
//   });
// };

const postMethod = async (req = request, res = response) => {
  let {
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
    idUsuarioModificacion,
  } = req.body;
  if (!idAlbergue || !nombre || !region) {
    return res.status(400).json({
      success: false,
      message: "Faltan datos obligatorios: idAlbergue, nombre, region",
    });
  }
  if (coordenadaX == null || coordenadaY == null) {
    return res.status(400).json({
      success: false,
      message: "Las coordenadas X e Y son obligatorias",
    });
  }
  if (!tipo_establecimiento || !tipo_albergue || !condicion_albergue) {
    return res.status(400).json({
      success: false,
      message:
        "Faltan datos obligatorios: tipo_establecimiento, tipo_albergue, condicion_albergue",
    });
  }
  if (!idUbicacion || !idCapacidad || !idInfraestructura || !idMunicipalidad) {
    return res.status(400).json({
      success: false,
      message:
        "Faltan IDs obligatorios: idUbicacion, idCapacidad, idInfraestructura, idMunicipalidad",
    });
  }

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
  idUsuarioModificacion = idUsuarioCreacion ?? null;
  
  
  try {
    const [results] = await pool.query(
      "CALL pa_InsertAlbergue(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [
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
        idUsuarioModificacion,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Albergue insertado correctamente",
      data: {
        p_id: results[0][0].id,
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
        idUsuarioModificacion,
      },
    });
  } catch (error) {
    console.error("Error al insertar albergue:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Ya existe un albergue con ese ID",
      });
    }

    res.status(500).json({
      success: false,
      error: "Error al insertar albergue",
      details: error.message,
    });
  }
};

const putMethod = async (req = request, res = response) => {
  const { id } = req.body;

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
    idUsuarioModificacion,
  } = req.body;

  // Validación básica
  if (!id || !idAlbergue || !nombre || !region || !coordenadaX) {
    return res.status(400).json({
      success: false,
      message: "Faltan datos obligatorios para actualizar el albergue",
    });
  }

  try {
    const [results] = await pool.query(
      "CALL pa_UpdateAlbergue(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [
        id,
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
        idUsuarioModificacion,
      ]
    );

    res.status(200).json({
      success: true,
      message: "Albergue actualizado correctamente",
      data: {
        id,
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
        idUsuarioModificacion,
      },
    });
  } catch (error) {
    console.error("Error al actualizar albergue:", error);
    res.status(500).json({
      success: false,
      error: "Error al actualizar albergue",
      details: error.message,
    });
  }
};

const deleteMethod = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de albergue no proporcionado en los parámetros de la URL",
    });
  }

  try {
    const [results] = await pool.query("CALL pa_DeleteAlbergue(?)", [id]);

    // Puedes verificar si se afectó algo si el SP devuelve filas
    if (results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró un albergue con ID ${id}`,
      });
    }

    res.json({
      success: true,
      message: `Albergue con ID ${id} eliminado correctamente`,
    });
  } catch (error) {
    console.error("Error al eliminar albergue:", error);
    res.status(500).json({
      success: false,
      error: "Error al eliminar albergue",
      details: error.message,
    });
  }
};

const getForIdMethod = async(req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID del albergue es requerido",
    });
  }
  try {
    const [results] = await pool.query("CALL pa_ConsultarAlberguePorId(?)", [id]);

    if (!results || !results[0] || results[0].length === 0) {
      return res.status(404).json({
        success: false,
        message: "Albergue no encontrado",
      });
    }

    const info = results[0];
    res.json({
      success: true,
      message: "Albergue obtenido exitosamente",
      data: info,
    });

  } catch (error) {
    console.error("Error en getForIdMethod:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener el albergue",
      details: error.message,
    });
  }
};

const getForNombreMethod = async (req = request, res = response) => {
  const { nombre } = req.params;
  if (!nombre) {
    return res.status(400).json({
      success: false,
      message: "Nombre del albergue es requerido",
    });
  }

  try {
    const [results] = await pool.query("CALL pa_ConsultarAlberguePorNombre(?)", [nombre]);

    if (!results || !results[0] || results[0].length === 0) {
      return res.status(404).json({
        success: false,
        message: "Albergue no encontrado",
      });
    }

    const info = results[0];
    res.json({
      success: true,
      message: "Albergue obtenido exitosamente",
      data: info,
    });
  } catch (error) {
    console.error("Error en getForPorNombreMethod:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener el nombre del albergue",
      details: error.message,
    });
  }
};

const getForUbicacionMethod = async (req = request, res = response) => {
  const { ubicacion } = req.params;
  if (!ubicacion) {
    return res.status(400).json({
      success: false,
      message: "Nombre de la ubicacion es requerido",
    });
  }

  try {
    const [results] = await pool.query("CALL pa_ConsultarAlbergueUbicacion(?)", [distrito]);

    if (!results || !results[0] || results[0].length === 0) {
      return res.status(404).json({
        success: false,
        message: "Ubicacion no encontrada",
      });
    }

    const info = results[0];
    res.json({
      success: true,
      message: "Albergues obtenidos exitosamente",
      data: info,
    });

  } catch (error) {
    console.error("Error en getForUbicacionMethod:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener la ubicacion del albergue",
      details: error.message,
    });
  }
};

module.exports = {
  getAllMethod,
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
  getForIdMethod,
  getForNombreMethod,
  getForUbicacionMethod,
};
