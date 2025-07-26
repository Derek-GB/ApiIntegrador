const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");
const amenazasService = require("../services/amenazasService");

// Este controlador maneja las operaciones CRUD para las amenazas
// const getAllMethod = (req = request, res = response) => {
//   // Llama al procedimiento almacenado para obtener todas las amenazas
//   pool.query("CALL pa_SelectAllAmenaza", (error, results) => {
//     // Maneja errores en la consulta
//     // Si hay un error, se captura y se envía una respuesta de error
//     if (error) {
//       console.error("Error en getAllMethod:", error);
//       return res.status(500).json({
//         success: false,
//         error: "Error al obtener amenazas",
//       });
//     }
//     // Verifica si se encontraron amenazas

//     res.json({
//       success: true,
//       data: results[0],
//     });
//   });
// };


const getAllAmenaza = async (req = request, res = response) => {
  try {
    const data = await amenazasService.getAllAmenaza();
    res.status(200).json({
      success: true,
      message: "Amenazas obtenidas correctamente",
      data: data[0], // importante si tu SP devuelve [[rows], metadata]
    });
  } catch (error) {
    console.error("Error en getAllAmenaza:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener amenazas",
      error: error.message,
    });
  }
};


// const getMethod = (req = request, res = response) => {
//   // Llama al procedimiento almacenado para obtener una amenaza específica por ID
//   const { id } = req.params;
//   // Verifica si se proporcionó el ID
//   pool.query("CALL pa_SelectAmenaza(?)", [id], (error, results) => {
//     if (error) {
//       console.error("Error en getMethod:", error);
//       return res.status(500).json({
//         success: false,
//         error: "Error al obtener amenaza",
//       });
//     }
//     // Verifica si se encontró la amenaza
//     if (results[0].length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Amenaza no encontrada",
//       });
//     }

//     res.json({
//       success: true,
//       data: results[0][0],
//     });
//   });
// };


const getAmenaza = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de amenaza no proporcionado",
    });
  }

  try {
    const result = await amenazasService.getAmenaza(id);
    const data = result[0][0]; // toma el primer registro si lo hay

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Amenaza no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error en getAmenaza:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener amenaza",
      error: error.message,
    });
  }
};






// const postMethod = (req = request, res = response) => {
//   // Llama al procedimiento almacenado para insertar una nueva amenaza
//   let {
//     familiaEvento,
//     evento,
//     peligro,
//     causa,
//     categoriaEvento,
//     idFamilia,
//     idUsuarioCreacion,
//   } = req.body;

//   // Validación mínima
//   if (!familiaEvento || !evento) {
//     return res.status(400).json({
//       success: false,
//       message: "Faltan datos: familiaEvento, evento",
//     });
//   }

//   // Asignar valores nulos a los opcionales si no vienen
//   peligro = peligro ?? null;
//   causa = causa ?? null;
//   categoriaEvento = categoriaEvento ?? null;
//   idFamilia = idFamilia ?? null;
//   idUsuarioCreacion = idUsuarioCreacion ?? null;

//   // Llamada al procedimiento almacenado
//   pool.query(
//     "CALL pa_InsertAmenaza(?, ?, ?, ?, ?, ?, ?)",
//     [
//       familiaEvento,
//       evento,
//       peligro,
//       causa,
//       categoriaEvento,
//       idFamilia,
//       idUsuarioCreacion,
//     ],
//     (error, results) => {
//       if (error) {
//         console.error("Error al insertar amenaza:", error);
//         return res.status(500).json({
//           success: false,
//           error: "Error al insertar amenaza",
//         });
//       }

//       res.status(201).json({
//         success: true,
//         message: "Amenaza insertada correctamente",
//         data: {
//           p_id: results[0][0].id,
//           familiaEvento,
//           evento,
//           peligro,
//           causa,
//           categoriaEvento,
//           idFamilia,
//           idUsuarioCreacion,
//         },
//       });
//     }
//   );
// };

const postAmenaza = async (req = request, res = response) => {
  try {
    const amenazaData = req.body;
    const result = await amenazasService.postAmenaza(amenazaData);

    res.status(201).json({
      success: true,
      message: "Amenaza insertada correctamente",
      data: amenazaData, // puedes ajustar esto si `result` trae el ID u otro dato
    });
  } catch (error) {
    console.error("Error al insertar amenaza:", error);
    res.status(500).json({
      success: false,
      message: "Error al insertar amenaza",
      error: error.message,
    });
  }
};



// const putMethod = (req = request, res = response) => {
//   // Llama al procedimiento almacenado para actualizar una amenaza existente
//   const { id } = req.body;
//   const { familiaEvento, evento, peligro } = req.body;

//   if (!id || !familiaEvento || evento == null || peligro == null) {
//     return res.status(400).json({
//       success: false,
//       message: "Faltan datos: familiaEvento, evento, peligro ",
//     });
//   }

//   pool.query(
//     "CALL pa_UpdateAmenaza(?, ?, ?, ?)",
//     [id, familiaEvento, evento, peligro],
//     (error, results) => {
//       if (error) {
//         console.error("Error al actualizar amenaza:", error);
//         return res.status(500).json({
//           success: false,
//           error: "Error al actualizar amenaza",
//         });
//       }

//       res.status(200).json({
//         success: true,
//         message: "Amenaza actualizada correctamente",
//         data: {
//           familiaEvento,
//           evento,
//           peligro,
//         },
//       });
//     }
//   );
// };


const putAmenaza = async (req = request, res = response) => {
  const amenazaData = req.body;

  if (!amenazaData.id || !amenazaData.familiaEvento || amenazaData.evento == null || amenazaData.peligro == null) {
    return res.status(400).json({
      success: false,
      message: "Faltan datos: id, familiaEvento, evento, peligro",
    });
  }

  try {
    await amenazasService.putAmenaza(amenazaData);
    res.status(200).json({
      success: true,
      message: "Amenaza actualizada correctamente",
      data: amenazaData,
    });
  } catch (error) {
    console.error("Error al actualizar amenaza:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar amenaza",
      error: error.message,
    });
  }
};





// const deleteMethod = (req = request, res = response) => {
//   // Llama al procedimiento almacenado para eliminar una amenaza por ID
//   const { id } = req.params;

//   if (!id) {
//     return res.status(400).json({
//       success: false,
//       message: "ID de amenaza no proporcionado en el body",
//     });
//   }

//   pool.query("CALL pa_DeleteAmenaza(?)", [id], (error, results) => {
//     if (error) {
//       console.error("Error al eliminar amenaza:", error);
//       return res.status(500).json({
//         success: false,
//         error: "Error al eliminar amenaza",
//       });
//     }

//     res.json({
//       success: true,
//       message: `Amenaza con ID ${id} eliminada correctamente`,
//     });
//   });
// };

const deleteAmenaza = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de amenaza no proporcionado",
    });
  }

  try {
    await amenazasService.deleteMethod(id);
    res.status(200).json({
      success: true,
      message: `Amenaza con ID ${id} eliminada correctamente`,
    });
  } catch (error) {
    console.error("Error al eliminar amenaza:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar amenaza",
      error: error.message,
    });
  }
};




module.exports = {
  getAllAmenaza,
  getAmenaza,
  postAmenaza,
  putAmenaza,
  deleteAmenaza,
};
