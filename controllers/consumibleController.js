const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");
const consumibleService = require("../services/consumibleService");

const getAllConsumibles = async (req = request, res = response) => {
  try {
    const data = await consumibleService.getAllConsumibles();
    res.status(200).json({
      success: true,
      data: data[0], // Assuming the first element contains the consumibles
    });
  } catch (error) {
    console.error("Error en getAllConsumibles:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los consumibles",
      error: error.message,
    });
  }
};

const getConsumible = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const result = await consumibleService.getConsumible(id);
        res.json({
            success: true,
            data: result[0][0],
        });
    } catch (error) {
        console.error("Error en getConsumible:", error);
        if (error.message === 'Consumible no encontrado') {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            error: "Error al obtener el consumible",
        });
    }

};

const postConsumible = async (req = request, res = response) => {
    let { nombre, unidadMedidaNombre, categoriaNombre, cantidad } = req.body;
    try {
        const data = await consumibleService.postConsumible({ nombre, unidadMedidaNombre, categoriaNombre, cantidad });
        res.status(201).json({
            success: true,
            message: 'Consumible insertado correctamente',
            data: {
                id: data[0][0].id,
                nombre,
                unidadMedidaNombre,
                categoriaNombre,
                cantidad,
            },
        });
    } catch (error) {
        console.error("Error en postConsumible:", error);
        res.status(500).json({
            success: false,
            error: "Error al insertar el consumible",
        });
    }
};

const deleteConsumible = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de consumible no proporcionado",
    });
  }
  try {
    await consumibleService.deleteConsumible(id);
    res.json({
      success: true,
      message: `Consumible con ID ${id} eliminado correctamente`,
    });
  } catch (error) {
    console.error("Error en deleteConsumible:", error);
    res.status(500).json({
      success: false,
      error: "Error al eliminar el consumible",
    });
  }
};

// const getAllMethod = (req = request, res = response) => {
//   pool.query("CALL pa_SelectAllConsumible", (error, results) => {
//     if (error) {
//       console.error("Error en getAllMethod:", error);
//       return res.status(500).json({
//         success: false,
//         error: "Error al obtener consumibles",
//       });
//     }

//     res.json({
//       success: true,
//       data: results[0],
//     });
//   });
// };

// const getMethod = (req = request, res = response) => {
//   const { id } = req.params;
//   pool.query("CALL pa_SelectConsumible(?)", [id], (error, results) => {
//     if (error) {
//       console.error("Error en getMethod:", error);
//       return res.status(500).json({
//         success: false,
//         error: "Error al obtener consumible",
//       });
//     }

//     if (results[0].length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Consumible no encontrado",
//       });
//     }

//     res.json({
//       success: true,
//       data: results[0][0],
//     });
//   });
// };

// const postMethod = (req = request, res = response) => {
//   const { nombre, unidadMedidaNombre, categoriaNombre, cantidad } = req.body;

//   if (!nombre || !unidadMedidaNombre || !categoriaNombre || cantidad == null) {
//     return res.status(400).json({
//       success: false,
//       message: "Faltan datos: nombre, unidadMedidaNombre, categoriaNombre, cantidad",
//     });
//   }

//   pool.query(
//     "CALL pa_InsertConsumible(?, ?, ?, ?)",
//     [nombre, unidadMedidaNombre, categoriaNombre, cantidad],
//     (error, results) => {
//       if (error) {
//         console.error("Error al insertar consumible:", error);
//         return res.status(500).json({
//           success: false,
//           error: "Error al insertar consumible",
//         });
//       }

//       res.status(201).json({
//         success: true,
//         message: "Consumible insertado correctamente",
//         data: {
//           id: results[0][0].id,
//           nombre,
//           unidadMedidaNombre,
//           categoriaNombre,
//           cantidad,
//         },
//       });
//     }
//   );
// };

// const putMethod = (req = request, res = response) => {
//   const { id } = req.body;
//   const { nombre, idUnidadMedida, idCategoria } = req.body;

//   if (!id || !nombre || idUnidadMedida == null || idCategoria == null) {
//     return res.status(400).json({
//       success: false,
//       message: "Faltan datos: id, nombre, idUnidadMedida, idCategoria",
//     });
//   }

//   pool.query(
//     "CALL pa_UpdateConsumible(?, ?, ?, ?)",
//     [id, nombre, idUnidadMedida, idCategoria],
//     (error, results) => {
//       if (error) {
//         console.error("Error al actualizar consumible:", error);
//         return res.status(500).json({
//           success: false,
//           error: "Error al actualizar consumible",
//         });
//       }

//       res.status(200).json({
//         success: true,
//         message: "Consumible actualizado correctamente",
//         data: {
//           id,
//           nombre,
//           idUnidadMedida,
//           idCategoria,
//         },
//       });
//     }
//   );
// };

// const deleteMethod = (req = request, res = response) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.status(400).json({
//       success: false,
//       message: "ID de consumible no proporcionado en el body",
//     });
//   }

//   pool.query("CALL pa_DeleteConsumible(?)", [id], (error, results) => {
//     if (error) {
//       console.error("Error al eliminar consumible:", error);
//       return res.status(500).json({
//         success: false,
//         error: "Error al eliminar consumible",
//       });
//     }

//     res.json({
//       success: true,
//       message: `Consumible con ID ${id} eliminado correctamente`,
//     });
//   });
// };

module.exports = {
  getAllMethod,
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
};
