const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");
const capacidadAlberguesService = require("../service/capacidadAlberguesService");

// Obtener todos los registros
// const getAllCapacidadAlbergue = (req = request, res = response) => {
//   pool.query("CALL pa_SelectAllCapacidadAlbergue()", (error, results) => {
//     if (error) {
//       console.error("Error en getAllCapacidadAlbergue:", error);
//       return res
//         .status(500)
//         .json({ success: false, error: "Error al obtener capacidades" });
//     }

//     res.json({ success: true, data: results[0] });
//   });
// };

const getAllCapacidadAlbergue = async (req = request, res = response) => {
  try {
    const data = await capacidadAlberguesService.getAllCapacidadAlbergue();
    res.status(200).json({
      success: true,
      message: "Capacidades obtenidas correctamente",
      data: data[0],
    });
  } catch (error) {
    console.error("Error en getAllCapacidadAlbergue:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener capacidades",
      error: error.message,
    });
  }
};



// Obtener un registro por ID
// const getCapacidadAlbergue = (req = request, res = response) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.status(400).json({ success: false, message: "ID requerido" });
//   }

//   pool.query("CALL pa_SelectCapacidadAlbergue(?)", [id], (error, results) => {
//     if (error) {
//       console.error("Error en getCapacidadAlbergue:", error);
//       return res
//         .status(500)
//         .json({ success: false, error: "Error al obtener capacidad" });
//     }

//     if (!results || !results[0] || results[0].length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Registro no encontrado" });
//     }

//     res.json({ success: true, data: results[0][0] });
//   });
// };

const getCapacidadAlbergue = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID requerido",
    });
  }

  try {
    const result = await capacidadAlberguesService.getCapacidadAlbergue(id);
    const data = result[0][0];

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Registro no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error en getCapacidadAlbergue:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener capacidad",
      error: error.message,
    });
  }
};


// Crear nuevo registro
// const postCapacidadAlbergue = (req = request, res = response) => {
//   let{
//     idAlbergue,
//     capacidadPersonas,
//     capacidadColectiva,
//     cantidadFamilias,
//     ocupacion,
//     egresos,
//     sospechososSanos,
//     otros,
//   } = req.body;

//   if (
//     !capacidadPersonas ||
//     !capacidadColectiva ||
//     !cantidadFamilias ||
//     !ocupacion ||
//     !egresos
//   ) {
//     return res.status(400).json({
//       success: false,
//       message: "Faltan campos obligatorios",
//     });
//   }
//   idAlbergue = idAlbergue ?? null;
//   sospechososSanos = sospechososSanos ?? null;
//   otros = otros ?? null;

//   pool.query(
//     "CALL pa_InsertCapacidadAlbergue(?, ?, ?, ?, ?, ?, ?, ?)",
//     [
//       idAlbergue,
//       capacidadPersonas,
//       capacidadColectiva,
//       cantidadFamilias,
//       ocupacion,
//       egresos,
//       sospechososSanos,
//       otros,
//     ],
//     (error, results) => {
//       if (error) {
//         console.error("Error en postCapacidadAlbergue:", error);
//         return res
//           .status(500)
//           .json({ success: false, error: "Error al crear registro" });
//       }

//       res.status(201).json({
//         success: true,
//         message: "Registro creado correctamente",
//         data: {
//           id: results[0][0].id,
//           idAlbergue,
//           capacidadPersonas,
//           capacidadColectiva,
//           cantidadFamilias,
//           ocupacion,
//           egresos,
//           sospechososSanos,
//           otros,
//         },
//       });
//     }
//   );
// };

const postCapacidadAlbergue = async (req = request, res = response) => {
  try {
    const capacidadData = req.body;
    const result = await capacidadAlberguesService.postCapacidadAlbergue(capacidadData);

    const inserted = result[0]?.[0] || {};

    res.status(201).json({
      success: true,
      message: "Registro creado correctamente",
      data: {
         ...capacidadData,
        id: inserted.id || null, // si el SP devuelve el id insertado
        idAlbergue: capacidadData.idAlbergue ?? null,
        sospechososSanos: capacidadData.sospechososSanos ?? null,
        otros: capacidadData.otros ?? null,
      },
    });
  } catch (error) {
    console.error("Error en postCapacidadAlbergue:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear registro",
      error: error.message,
    });
  }
};



// Actualizar un registro
// const putCapacidadAlbergue = (req = request, res = response) => {
//   const {
//     idAlbergue,
//     capacidadPersonas,
//     capacidadColectiva,
//     cantidadFamilias,
//     ocupacion,
//     egresos,
//     sospechososSanos,
//     otros,
//   } = req.body;

//   if (
//     id == null ||
//     capacidad_personas == null ||
//     capacidad_colectiva == null ||
//     cantidad_familias == null ||
//     ocupacion == null ||
//     egresos == null ||
//     sospechosos_sanos == null
//   ) {
//     return res.status(400).json({
//       success: false,
//       message: "Faltan campos obligatorios o el ID",
//     });
//   }

//   pool.query(
//     "CALL pa_UpdateCapacidadAlbergue(?, ?, ?, ?, ?, ?, ?, ?)",
//     [
//       id,
//       capacidad_personas,
//       capacidad_colectiva,
//       cantidad_familias,
//       ocupacion,
//       egresos,
//       sospechosos_sanos,
//       otros,
//     ],
//     (error, results) => {
//       if (error) {
//         console.error("Error en putCapacidadAlbergue:", error);
//         return res
//           .status(500)
//           .json({ success: false, error: "Error al actualizar registro" });
//       }

//       res.json({
//         success: true,
//         message: "Registro actualizado correctamente",
//       });
//     }
//   );
// };

const putCapacidadAlbergue = async (req = request, res = response) => {
  const capacidadData = req.body;

  if (!capacidadData.id) {
    return res.status(400).json({
      success: false,
      message: "ID es obligatorio para actualizar",
    });
  }

  try {
    await capacidadAlberguesService.putCapacidadAlbergue(capacidadData);
    res.status(200).json({
      success: true,
      message: "Registro actualizado correctamente",
      data: capacidadData,
    });
  } catch (error) {
    console.error("Error en putCapacidadAlbergue:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar registro",
      error: error.message,
    });
  }
};



// Eliminar registro
// const deleteCapacidadAlbergue = (req = request, res = response) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.status(400).json({
//       success: false,
//       message: "ID requerido para eliminar",
//     });
//   }

//   pool.query("CALL pa_DeleteCapacidadAlbergue(?)", [id], (error, results) => {
//     if (error) {
//       console.error("Error en deleteCapacidadAlbergue:", error);
//       return res
//         .status(500)
//         .json({ success: false, error: "Error al eliminar registro" });
//     }

//     res.json({
//       success: true,
//       message: `Registro con ID ${id} eliminado correctamente`,
//     });
//   });
// };


const deleteCapacidadAlbergue = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID requerido para eliminar",
    });
  }

  try {
    await capacidadAlberguesService.deleteCapacidadAlbergue(id);
    res.status(200).json({
      success: true,
      message: `Registro con ID ${id} eliminado correctamente`,
    });
  } catch (error) {
    console.error("Error en deleteCapacidadAlbergue:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar registro",
      error: error.message,
    });
  }
};



module.exports = {
  getAllCapacidadAlbergue,
  getCapacidadAlbergue,
  postCapacidadAlbergue,
  putCapacidadAlbergue,
  deleteCapacidadAlbergue,
};
