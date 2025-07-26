const { request, response } = require('express');
const { pool } = require('../MySQL/basedatos')
const categoriaConsumibleService = require('../services/categoriaConsumibleServer');

const getAllCategoriaConsumibles = async (req = request, res = response) => {
    try {
        const data = await categoriaConsumibleService.getAllcategoriaConsumibles();
        res.status(200).json({
            success: true,
            message: "Lista obtenida correctamente",
            data: data[0],
        });
    } catch (error) {
        console.error("Error en getAllCategoriaConsumibles:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener datos",
            error: error.message,
        });
    }
};

const getCategoriaConsumible = async (req = request, res = response) => {
    const { id } = req.params;
        try {
            const result = await categoriaConsumibleService.getCategoriaConsumible(id);
            res.json({
                success: true,
                data: result[0][0],
            });
        } catch (error) {
            console.error("Error en getCategoriaConsumible:", error);
            if (error.message === 'Categoria no encontrada') {
                return res.status(404).json({
                    success: false,
                    message: error.message,
                });
            }
            res.status(500).json({
                success: false,
                error: "Error al obtener el categoria consumible",
            });
        }
    
    };

const postCategoriaConsumible = async (req = request, res = response) => {
    let { nombre, idConsumible } = req.body;
    try {
        const data = await categoriaConsumibleService.postcategoriaConsumible({ nombre, idConsumible });
        res.status(201).json({
            success: true,
            message: 'Categoria consumible insertado correctamente',
            data: {
                id: data[0][0].id,
                nombre,
                idConsumible
            },
        });
    } catch (error) {
        console.error("Error en postCategoriaConsumible:", error);
        res.status(500).json({
            success: false,
            message: "Error al insertar categoria consumible",
            error: error.message,
        });
    }
};

const deleteCategoriaConsumible = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        await categoriaConsumibleService.deleteCategoriaConsumible(id);
        res.json({
            success: true,
            message: `Categoria consumible con ID ${id} eliminado correctamente`,
        });
    } catch (error) {
        console.error("Error en deleteCategoriaConsumible:", error);
        if (error.message === 'Categoria consumible no encontrado') {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: "Error al eliminar categoria consumible",
            error: error.message,
        });
    }
};

// const getAllMethod = (req = request, res = response) => {
//     pool.query('CALL pa_SelectAllCategoriaConsumible', (error, results) => {
//         if (error) {
//             console.error('Error en getAllMethod:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al obtener categorías de consumibles'
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
//     pool.query('CALL pa_SelectCategoriaConsumible(?)', [id], (error, results) => {
//         if (error) {
//             console.error('Error en getMethod:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al obtener categoría de consumible'
//             });
//         }

//         if (results[0].length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Categoria no encontrado'
//             });
//         }

//         res.json({
//             success: true,
//             data: results[0][0]
//         });
//     });
// };


// const postMethod = (req = request, res = response) => {
//     let { nombre, idConsumible } = req.body;

//     if (!nombre ) {
//         return res.status(400).json({
//             success: false,
//             message: 'Faltan datos: nombre, idConsumible'
//         });
//     }
//     idConsumible = idConsumible ?? null; 
//     pool.query('CALL pa_InsertCategoriaConsumible(?, ?)', [nombre, idConsumible], (error, results) => {
//         if (error) {
//             console.error('Error al insertar categoria:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al insertar categoria de consumible'
//             });
//         }

//         res.status(201).json({
//             success: true,
//             message: 'Categoria insertado correctamente',
//             data: {
//                  id: results[0][0].id,
//                 nombre, idConsumible
//             }
//         });
//     });
// };

// const putMethod = (req = request, res = response) => {
//     const {id} = req.body;
//     const {nombre, idConsumible } = req.body;

//     if (!id || !nombre || idConsumible == null) {
//         return res.status(400).json({
//             success: false,
//             message: 'Faltan datos: id, nombre, idConsumible'
//         });
//     }

//     pool.query('CALL pa_UpdateCategoriaConsumible(?, ?, ?, ?)', [id, nombre, idConsumible], (error, results) => {
//         if (error) {
//             console.error('Error al actualizar categoria:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al actualizar categoria de consumible'
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Categoria actualizado correctamente',
//             data: {
//                 id, nombre, idConsumible
//             }
//         });
//     });
// };


// const deleteMethod = (req = request, res = response) => {
//     const { id } = req.params; 

//     if (!id) {
//         return res.status(400).json({
//             success: false,
//             message: 'ID de categoria no proporcionado en el body'
//         });
//     }

//     pool.query('CALL pa_DeleteCategoriaConsumible(?)', [id], (error, results) => {
//         if (error) {
//             console.error('Error al eliminar categoria:', error);
//             return res.status(500).json({
//                 success: false,
//                 error: 'Error al eliminar categoria de consumible'
//             });
//         }

//         res.json({
//             success: true,
//             message: `Categoria con ID ${id} eliminado correctamente`
//         });
//     });
// };


module.exports = {
    getAllCategoriaConsumibles,
    getCategoriaConsumible,
    postCategoriaConsumible,
    deleteCategoriaConsumible,
    // getAllMethod,
    // getMethod,
    // postMethod,
    // putMethod,
    // deleteMethod
}