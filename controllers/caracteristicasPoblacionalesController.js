const { request, response } = require('express');
const { pool } = require('../MySQL/basedatos')
const caracteristicasPoblacionalesService = require('../services/caracteristicasPoblacionalesService');

// const getAllcaracteristicasPoblacionales = (req = request, res = response) => {
//     pool.query('CALL pa_SelectAllCaracteristicasPoblacionales', (error, results) => {
//         if (error) {
//             console.error('Error en getAllcaracteristicasPoblacionales:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al obtener caracteristicas poblacionales'
//             });
//         }

//         res.json({
//             success: true,
//             data: results[0]
//         });
//     });
// };

const getAllcaracteristicasPoblacionales = async (req = request, res = response) => {
  try {
    const data = await caracteristicasPoblacionalesService.getAllcaracteristicasPoblacionales();
    res.status(200).json({
      success: true,
      message: "Lista obtenida correctamente",
      data: data[0],
    });
  } catch (error) {
    console.error("Error en getAllcaracteristicasPoblacionales:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener datos",
      error: error.message,
    });
  }
};


// const getcaracteristicasPoblacionales = (req = request, res = response) => {
//     const { id } = req.params;
//     pool.query('CALL pa_SelectCaracteristicasPoblacionales(?)', [id], (error, results) => {
//         if (error) {
//             console.error('Error en getcaracteristicasPoblacionales:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al obtener caracteristicas poblacionales'
//             });
//         }

//         if (results[0].length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Caracteristicas poblacionales no encontrada'
//             });
//         }

//         res.json({
//             success: true,
//             data: results[0][0]
//         });
//     });
// };

const getcaracteristicasPoblacionales = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID requerido",
    });
  }

  try {
    const result = await caracteristicasPoblacionalesService.getcaracteristicasPoblacionales(id);
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
    console.error("Error en getcaracteristicasPoblacionales:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener registro",
      error: error.message,
    });
  }
};



// const postcaracteristicasPoblacionales = (req = request, res = response) => {
//     let { migrante, indigena, idPersona } = req.body;

//     if (!migrante || !indigena) {
//         return res.status(400).json({
//             success: false,
//             message: 'Faltan datos: migrante, indigena'
//         });
//     }

//     idPersona = idPersona ?? null; 

//     pool.query('CALL pa_InsertCaracteristicasPoblacionales(?, ?, ?)', [migrante, indigena, idPersona], (error, results) => {
//         if (error) {
//             console.error('Error al insertar caracteristicas poblacionales:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al insertar caracteristicas poblacionales'
//             });
//         }

//         res.status(201).json({
//             success: true,
//             message: 'Caracteristicas poblacionales insertada correctamente',
//             data: {
//                 p_id: results[0][0].id,
//                 migrante,
//                 indigena,
//                 idPersona
//             }
//         });
//     });
// };

const postcaracteristicasPoblacionales = async (req = request, res = response) => {
  try {
    const datos = req.body;
    const result = await caracteristicasPoblacionalesService.postcaracteristicasPoblacionales(datos);

    const inserted = result[0]?.[0] || {};

    res.status(201).json({
      success: true,
      message: "Registro creado correctamente",
      data: {
        ...datos,
        id: inserted.id || null,
      },
    });
  } catch (error) {
    console.error("Error en postcaracteristicasPoblacionales:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear registro",
      error: error.message,
    });
  }
};



// const putcaracteristicasPoblacionales = (req = request, res = response) => {
//     const {id} = req.body;
//     const {migrante, indigena, idPersona } = req.body;

//     if (!id || !migrante || indigena == null || !idPersona) {
//         return res.status(400).json({
//             success: false,
//             message: 'Faltan datos: migrante, indigena '
//         });
//     }

//     pool.query('CALL pa_UpdateCaracteristicasPoblacionales(?, ?, ?, ?)', [id, migrante, indigena, idPersona], (error, results) => {
//         if (error) {
//             console.error('Error al actualizar caracteristicas poblacionales:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al actualizar caracteristicas poblacionales'
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Caracteristicas poblacionales actualizada correctamente',
//             data: {
//                 migrante,
//                 indigena,
//                 idPersona
//             }
//         });
//     });
// };

const putcaracteristicasPoblacionales = async (req = request, res = response) => {
  const datos = req.body;

  if (!datos.id) {
    return res.status(400).json({
      success: false,
      message: "ID es obligatorio para actualizar",
    });
  }

  try {
    await caracteristicasPoblacionalesService.putcaracteristicasPoblacionales(datos);
    res.status(200).json({
      success: true,
      message: "Registro actualizado correctamente",
      data: datos,
    });
  } catch (error) {
    console.error("Error en putcaracteristicasPoblacionales:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar registro",
      error: error.message,
    });
  }
};



// const deletecaracteristicasPoblacionales = (req = request, res = response) => {
//     const { id } = req.params; 

//     if (!id) {
//         return res.status(400).json({
//             success: false,
//             message: 'ID de ubicacion no proporcionado en el body'
//         });
//     }

//     pool.query('CALL pa_DeleteCaracteristicasPoblacionales(?)', [id], (error, results) => {
//         if (error) {
//             console.error('Error al eliminar caracteristica poblacionales:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al eliminar caracteristicas poblacionales'
//             });
//         }

//         res.json({
//             success: true,
//             message: `Caracteristicas poblacionales con ID ${id} eliminada correctamente`
//         });
//     });
// };

const deletecaracteristicasPoblacionales = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID requerido para eliminar",
    });
  }

  try {
    await caracteristicasPoblacionalesService.deletecaracteristicasPoblacionales(id);
    res.status(200).json({
      success: true,
      message: `Registro con ID ${id} eliminado correctamente`,
    });
  } catch (error) {
    console.error("Error en deletecaracteristicasPoblacionales:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar registro",
      error: error.message,
    });
  }
};


module.exports = {
    getAllcaracteristicasPoblacionales,
    getcaracteristicasPoblacionales,
    postcaracteristicasPoblacionales,
    putcaracteristicasPoblacionales,
    deletecaracteristicasPoblacionales
}