const { request, response } = require('express');
const { pool } = require('../MySQL/basedatos')

const getAllMethod = (req = request, res = response) => {
    pool.query('CALL pa_SelectAllAmenaza', (error, results) => {
        if (error) {
            console.error('Error en getAllMethod:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al obtener amenazas'
            });
        }

        res.json({
            success: true,
            data: results[0]
        });
    });
};

const getMethod = (req = request, res = response) => {
    const { id } = req.body;
    pool.query('CALL pa_SelectAmenaza(?)', [id], (error, results) => {
        if (error) {
            console.error('Error en getMethod:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al obtener amenaza'
            });
        }

        if (results[0].length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Amenaza no encontrada'
            });
        }

        res.json({
            success: true,
            data: results[0][0]
        });
    });
};


const postMethod = (req = request, res = response) => {
    const { familiaEvento, evento, peligro } = req.body;

    if (!familiaEvento || evento == null || peligro == null) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos: familiaEvento, evento, peligro '
        });
    }

    pool.query('CALL pa_InsertAmenaza(?, ?, ?)', [familiaEvento, evento, peligro], (error, results) => {
        if (error) {
            console.error('Error al insertar amenaza:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al insertar amenaza'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Amenaza insertada correctamente',
            data: {
                familiaEvento,
                evento,
                peligro
            }
        });
    });
};

const putMethod = (req = request, res = response) => {
    const {id} = req.body;
    const {familiaEvento, evento, peligro} = req.body;

    if (!id || !familiaEvento || evento == null || peligro == null) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos: familiaEvento, evento, peligro '
        });
    }

    pool.query('CALL pa_UpdateAmenaza(?, ?, ?, ?)', [id, familiaEvento, evento, peligro ], (error, results) => {
        if (error) {
            console.error('Error al actualizar amenaza:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al actualizar amenaza'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Amenaza actualizada correctamente',
            data: {
                familiaEvento,
                evento,
                peligro
            }
        });
    });
};


const deleteMethod = (req = request, res = response) => {
    const { id } = req.body; 

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID de amenaza no proporcionado en el body'
        });
    }

    pool.query('CALL pa_DeleteAmenaza(?)', [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar amenaza:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al eliminar amenaza'
            });
        }

        res.json({
            success: true,
            message: `Amenaza con ID ${id} eliminada correctamente`
        });
    });
};


module.exports = {
    getAllMethod,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
}