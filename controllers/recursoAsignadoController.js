const { request, response } = require('express');
const { pool } = require('../MySQL/basedatos')
const recursoAsignadoService = require('../service/recursoAsignadoService');

const getAllRecursosAsignados = async (req = request, res = response) => {
    try {
        const data = await recursoAsignadoService.getAllRecursosAsignados();
        res.status(200).json({
            success: true,
            data: data,
            message: "Recursos asignados obtenidos exitosamente",
        });
    } catch (error) {
        console.error("Error en getAllRecursosAsignados:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener los recursos asignados",
            error: error.message, // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
        });
    }
};

const getRecursoAsignado = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const data = await recursoAsignadoService.getRecursoAsignado(id);
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Recurso asignado no encontrado",
            });
        }
        res.json({
            success: true,
            data: data[0],
        });
    } catch (error) {
        console.error("Error en getRecursoAsignado:", error);
        return res.status(500).json({
            success: false,
            error: "Error al obtener recurso asignado",
        });
    }
};

const postRecursoAsignado = async (req, res) => {
    let { 
        idProducto, 
        idPersona,
        cantidadAsignada
         
    } = req.body;

    try {
        const data = await recursoAsignadoService.postRecursoAsignado({ idProducto, idPersona, cantidadAsignada });
        res.status(201).json({
                success: true,
                message: 'Recurso insertado correctamente',
                data: {
                    id: results[0][0].id,
                    idProducto,
                    idPersona,
                    cantidadAsignada
                    
                }
            });
    } catch (error) {
        console.error("Error en postRecursoAsignado:", error);
        res.status(500).json({
            success: false,
            message: "Error al insertar producto",
            error: error.message, // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
        });
    }
}

const deleteRecursoAsignado = async (req, res) => {
    const { idProducto, idPersona } = req.body;
    if (!idProducto || !idPersona) {
        return res.status(400).json({
            success: false,
            message: 'Se requieren tanto idProducto como idPersona en el body'
        });
    }
    try {
        const result = await recursoAsignadoService.deleteRecursoAsignado(idProducto, idPersona
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron recursos asignados para eliminar con los IDs proporcionados'
            });
        }
        res.json({
            success: true,
            message: `Recurso asignado eliminado correctamente para Producto ID: ${idProducto} y Persona ID: ${idPersona}`,
            affectedRows: result.affectedRows
        });
    } catch (error) {
        console.error("Error al eliminar recurso asignado:", error);
        return res.status(500).json({
            success: false,
            error: "Error al eliminar recurso asignado",
        });
    }
}
// const getAllMethod = (req = request, res = response) => {
//     pool.query('CALL pa_SelectAllRecursosAsignados', (error, results) => {
//         if (error) {
//             console.error('Error en getAllMethod:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al obtener los recursos asignados'
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
//     const { idProducto, idPersona } = req.body;
//     if (!idProducto || !idPersona) {
//         return res.status(400).json({
//             success: false,
//             message: 'Se requieren tanto idProducto como idPersona en el body'
//         });
//     }
//     pool.query('CALL pa_SelectRecursosAsignados(?, ?)', [idProducto, idPersona], (error, results) => {
//         if (error) {
//             console.error('Error en getMethod:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al obtener recurso asignado'
//             });
//         }
//         if (results[0].length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Recurso asignado no encontrado para los IDs proporcionados'
//             });
//         }
//         res.json({
//             success: true,
//             data: results[0][0]
//         });
//     });
// };


// const postMethod = (req = request, res = response) => {
//     let { idProducto, idPersona, cantidadAsignada } = req.body;
//     if (!idProducto || !idPersona || !cantidadAsignada) {
//         return res.status(400).json({
//             success: false,
//             message: 'Faltan datos: idProducto, idPersona, cantidadAsignada son requeridos'
//         });
//     }
//     pool.query('CALL pa_InsertRecursosAsignados(?, ?, ?)', [idProducto, idPersona, cantidadAsignada], (error, results) => {
//         if (error) {
//             console.error('Error al insertar recurso asignado:', error);
//             if (error.code === 'ER_NO_REFERENCED_ROW_2') {
//                 return res.status(400).json({
//                     success: false,
//                     error: 'El producto o la persona especificada no existe'
//                 });
//             }
//             if (error.code === 'ER_DUP_ENTRY') {
//                 return res.status(409).json({
//                     success: false,
//                     error: 'Ya existe una asignación de este producto para esta persona'
//                 });
//             }
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al insertar recurso asignado'
//             });
//         }
//         res.status(201).json({
//             success: true,
//             message: 'Recurso asignado insertado correctamente',
//             data: {
//                 id: results[0][0]?.id ?? null,
//                 idProducto,
//                 idPersona,
//                 cantidadAsignada
//             }
//         });
//     });
// };

// const putMethod = (req = request, res = response) => {
//     const {id} = req.body;
//     const { idProducto, idPersona, cantidadAsignada } = req.body;
//     if (!idProducto || !idPersona || cantidadAsignada == null) {
//         return res.status(400).json({
//             success: false,
//             message: 'Faltan datos: idProducto, idPersona, cantidadAsignada son requeridos'
//         });
//     }
//     pool.query('CALL pa_UpdateRecursosAsignados(?, ?, ?)', [idProducto, idPersona, cantidadAsignada], (error, results) => {
//         if (error) {
//             console.error('Error al actualizar recurso asignado:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al actualizar recurso asignado'
//             });
//         }
//         const affectedRows = results.affectedRows || 0;
//         if (affectedRows === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'No se encontro el recurso asignado para actualizar con los IDs proporcionados'
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: 'Recurso asignado actualizado correctamente',
//             data: {
//                 idProducto,
//                 idPersona,
//                 cantidadAsignada
//             }
//         });
//     });
// };

// //Hay que revisar esto
// const deleteMethod = (req = request, res = response) => {
//     const { idProducto, idPersona } = req.body; 
//     if (!idProducto || !idPersona) {
//         return res.status(400).json({
//             success: false,
//             message: 'Se requieren tanto idProducto como idPersona en el body'
//         });
//     }
//     pool.query('CALL pa_DeleteRecursosAsignados(?, ?)', [idProducto, idPersona], (error, results) => {
//         if (error) {
//             console.error('Error al eliminar recursos asignados:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al eliminar recursos asignados'
//             });
//         }

//         const affectedRows = results.affectedRows || 0;
//         if (affectedRows === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'No se encontraron recursos asignados para eliminar con los IDs proporcionados'
//             });
//         }
//         res.json({
//             success: true,
//             message: `Recursos asignados eliminados correctamente para Producto ID: ${idProducto} y Persona ID: ${idPersona}`,
//             affectedRows: affectedRows
//         });
//     });
// };


module.exports = {
    getAllRecursosAsignados,
    getRecursoAsignado,
    postRecursoAsignado,
    deleteRecursoAsignado
    // getAllMethod,
    // getMethod,
    // postMethod,
    // putMethod,
    // deleteMethod
}