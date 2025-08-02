const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");
const condicionSaludService = require("../service/condicionSaludService");

const getAllCondicionesSalud = async (req = request, res = response) => {
  try {
    const data = await consumibleService.getAllCondicionesSalud();
    res.status(200).json({
      success: true,
      data: data[0], 
    });
  } catch (error) {
    console.error("Error en getAllCondicionesSalud:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener la condiciones de salud",
      error: error.message,
    });
  }
};

const getCondicionSalud = async (req = request, res = response) => {
  const { id } = req.params;
      try {
          const result = await condicionSaludService.getCondicionSalud(id);
          res.json({
              success: true,
              data: result[0][0],
          });
      } catch (error) {
          console.error("Error en getCondicionSalud:", error);
          if (error.message === 'Condicion de salud no encontrado') {
              return res.status(404).json({
                  success: false,
                  message: error.message,
              });
          }
          res.status(500).json({
              success: false,
              error: "Error al obtener el condicion de salud",
          });
      }
};

const postCondicionSalud = async (req = request, res = response) => {
  let { descripcion, idCondicionesEspeciales } = req.body;
  try {
      const data = await condicionSaludService.postCondicionSalud({ descripcion, idCondicionesEspeciales });
      res.status(201).json({
          success: true,
          message: 'Condicion de salud insertada correctamente',
          data: {
              id: data[0][0].id,
              descripcion,
              idCondicionesEspeciales,
          },
      });
  } catch (error) {
      console.error("Error al insertar condicion de salud:", error);
      res.status(500).json({
          success: false,
          error: "Error al insertar condicion de salud",
      });
  }
}

const deleteCondicionSalud = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de condicion de salud no proporcionado",
    });
  }
  try {
    const data = await condicionSaludService.deleteCondicionSalud(id);
    res.json({
      success: true,
      message: `Condicion de salud con ID ${id} eliminada correctamente`,
    });
  } catch (error) {
    console.error("Error al eliminar condicion de salud:", error);
    res.status(500).json({
      success: false,
      error: "Error al eliminar condicion de salud",
    });
  }
};


// const getAllMethod = (req = request, res = response) => {
//   pool.query("CALL pa_SelectAllCondicionesSalud", (error, results) => {
//     if (error) {
//       console.error("Error en getAllMethod:", error);
//       return res.status(500).json({
//         success: false,
//         error: "Error al obtener condiciones de salud",
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
//   pool.query("CALL pa_SelectCondicionesSalud(?)", [id], (error, results) => {
//     if (error) {
//       console.error("Error en getMethod:", error);
//       return res.status(500).json({
//         success: false,
//         error: "Error al obtener condiciones de salud",
//       });
//     }

//     if (results[0].length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Condiciones de salud no encontrada",
//       });
//     }

//     res.json({
//       success: true,
//       data: results[0][0],
//     });
//   });
// };

// const postMethod = (req = request, res = response) => {
//   let { descripcion, idCondicionesEspeciales } = req.body;

//   if (!descripcion) {
//     return res.status(400).json({
//       success: false,
//       message: "Faltan datos: descripcion ",
//     });
//   }
//   idCondicionesEspeciales = idCondicionesEspeciales ?? null;

//   pool.query(
//     "CALL pa_InsertCondicionesSalud(?,?)",
//     [descripcion, idCondicionesEspeciales],
//     (error, results) => {
//       if (error) {
//         console.error("Error al insertar condiciones de salud:", error);
//         return res.status(500).json({
//           success: false,
//           error: "Error al insertar ubicondicones de salud",
//         });
//       }

//       res.status(201).json({
//         success: true,
//         message: "Condiciones de salud insertada correctamente",
//         data: {
//           id: results[0][0].id,
//           descripcion,
//           idCondicionesEspeciales,
//         },
//       });
//     }
//   );
// };

// const putMethod = (req = request, res = response) => {
//   const { id } = req.body;
//   const { descripcion, idCondicionesEspeciales } = req.body;

//   if (!id || !descripcion == null || !idCondicionesEspeciales == null) {
//     return res.status(400).json({
//       success: false,
//       message: "Faltan datos: descripcion ",
//     });
//   }

//   pool.query(
//     "CALL pa_UpdateCondicionesSalud(?, ?, ?)",
//     [id, descripcion, idCondicionesEspeciales],
//     (error, results) => {
//       if (error) {
//         console.error("Error al actualizar condiciones de salud:", error);
//         return res.status(500).json({
//           success: false,
//           error: "Error al actualizar condiciones de salud",
//         });
//       }

//       res.status(200).json({
//         success: true,
//         message: "Condiciones de salud actualizada correctamente",
//         data: {
//           descripcion,
//           idCondicionesEspeciales,
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
//       message: "ID de condiciones de salud no proporcionado en el body",
//     });
//   }

//   pool.query("CALL pa_DeleteCondicionesSalud(?)", [id], (error, results) => {
//     if (error) {
//       console.error("Error al eliminar condiciones de salud:", error);
//       return res.status(500).json({
//         success: false,
//         error: "Error al eliminar condiciones de salud",
//       });
//     }

//     res.json({
//       success: true,
//       message: `Condiciones de salud con ID ${id} eliminada correctamente`,
//     });
//   });
// };

module.exports = {
  getAllCondicionesSalud,
  getCondicionSalud,
  postCondicionSalud,
  deleteCondicionSalud,
  // getAllMethod,
  // getMethod,
  // postMethod,
  // putMethod,
  // deleteMethod
};
