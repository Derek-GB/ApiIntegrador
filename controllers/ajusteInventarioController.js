const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");
const ajusteInventarioService = require("../service/ajusteInventarioService");

// const getAllMethod = (req = request, res = response) => {
//   pool.query("CALL pa_SelectAllAjusteInventario", (error, results) => {
//     if (error) {
//       console.error("Error en getAllMethod:", error);
//       return res.status(500).json({
//         success: false,
//         error: "Error al obtener los ajustes de inventario",
//       });
//     }
//     res.json({
//       success: true,
//       data: results[0],
//     });
//   });
// };

const getAllAjusteInventarios = async (req = request, res = response) => {
  try {
    const data = await ajusteInventarioService.getAllAjusteInventario();
    res.status(200).json({
      success: true,
      message: 'Lista de ajustes obtenida correctamente',
      data: data[0], 
    });
  } catch (error) {
    console.error("Error en getAllAjuste:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los ajustes de inventario",
      error: error.message,
    });
  }
};



// const getMethod = (req = request, res = response) => {
//   const { id } = req.params;
//   pool.query("CALL pa_SelectAjusteInventario(?)", [id], (error, results) => {
//     if (error) {
//       console.error("Error en getMethod:", error);
//       return res.status(500).json({
//         success: false,
//         error: "Error al obtener el ajuste de inventario",
//       });
//     }
//     if (results[0].length === 0) {
//       return res.status(404).json({
//         success: false,
//         error: "Ajuste de inventario no encontrado",
//       });
//     }
//     res.json({
//       success: true,
//       data: results[0][0],
//     });
//   });
// };

//Cambio de getMethod DDA
const getAjuste = async (req = request, res = response) => {
  const { id } = req.body;

  try {
    const data = await ajusteInventarioService.getAjuste(id); // se espera que esta función retorne los datos consultados
    res.status(200).json({
      success: true,
      message: 'Consulta de ajuste de inventario exitosa',
      data: data
    });
  } catch (error) {
    console.error("Error en getAjuste:", error);
    res.status(500).json({
      success: false,
      message: "Error al consultar el ajuste de inventario",
      error: error.message,
    });
  }
};


// const postMethod = (req = request, res = response) => {
//   const { idProducto, justificacion, cantidadOriginal, cantidadAjustada, idUsuarioCreacion } = req.body;

//   if (!idProducto || !justificacion || !cantidadOriginal || !cantidadAjustada || !idUsuarioCreacion) {
//     return res.status(400).json({
//       success: false,
//       error: "Todos los campos son obligatorios",
//     });
//   }

//   pool.query(
//     "CALL pa_InsertAjusteInventario(?, ?, ?, ?, ?)",
//     [idProducto, cantidadOriginal, cantidadAjustada, justificacion, idUsuarioCreacion],
//     (error, results) => {
//       if (error) {
//         console.error("Error en postMethod:", error);
//         return res.status(500).json({
//           success: false,
//           error: "Error al registrar el ajuste de inventario",
//         });
//       }
//       res.status(201).json({
//         success: true,
//         message: "Ajuste de inventario registrado correctamente",
//       });
//     }
//   );
// };

const postAjuste = async (req = request, res = response) => {
  const { idProducto, cantidadOriginal,cantidadAjustada,justificacion,idUsuarioCreacion } = req.body;

  try {
    const mensaje = await ajusteInventarioService.postAjusteInventario({
      idProducto,
      cantidadOriginal,
      cantidadAjustada,
      justificacion,
      idUsuarioCreacion,
    });

    res.status(201).json({
      success: true,
      message: mensaje.mensaje || "Ajuste registrado correctamente",
    });
  } catch (error) {
    console.error("Error en postAjuste:", error);
    res.status(500).json({
      success: false,
      message: "Error al registrar el ajuste de inventario",
      error: error.message,
    });
  }
};

const getAjustesPorProducto = async (req = request, res = response) => {
  const { nombreProducto } = req.params;
  try {
    const data = await ajusteInventarioService.getAjustesPorProducto(nombreProducto);
    res.status(200).json({
      success: true,
      message: 'Lista de ajustes obtenida correctamente',
      data: data[0], 
    });
  } catch (error) {
    console.error("Error en getAjustesPorProducto:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los ajustes de inventario",
      error: error.message,
    });
  }
}

module.exports = {
  getAllAjusteInventarios,
  getAjuste,
  postAjuste,
  getAjustesPorProducto
};