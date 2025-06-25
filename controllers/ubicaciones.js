const { request, response } = require('express');
const { pool } = require('../MySQL/basedatos')

const getAllMethod = (req = request, res = response) => {
    pool.query('CALL pa_SelectAllUbicacion', (error, results) => {
        if (error) {
            console.error('Error en getAllMethod:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al obtener ubicaciones'
            });
        }

        res.json({
            success: true,
            data: results[0]
        });
    });
};

const getMethod = (req = request, res = response) => {
    const { id } = req.params;
    pool.query('CALL pa_SelectUbicacion(?)', [id], (error, results) => {
        if (error) {
            console.error('Error en getMethod:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al obtener ubicacion'
            });
        }

        if (results[0].length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ubicacion no encontrada'
            });
        }

        res.json({
            success: true,
            data: results[0][0]
        });
    });
};


const postMethod = (req = request, res = response) => {
    const { provincia, canton, distrito, direccion } = req.body;

    if (!provincia == null || canton == null || distrito == null || direccion == null) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos: provincia, canton, distrito, direccion '
        });
    }

    pool.query('CALL pa_InsertUbicacion(?, ?, ?, ?)', [provincia, canton, distrito, direccion], (error, results) => {
        if (error) {
            console.error('Error al insertar ubicacion:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al insertar ubicacion'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Ubicacion insertada correctamente',
            data: {
                provincia,
                canton,
                distrito,
                direccion
            }
        });
    });
};

const putMethod = (req = request, res = response) => {
    const {id} = req.body;
    const {provincia, canton, distrito, direccion } = req.body;

    if (!id || !provincia || canton == null || distrito == null || direccion == null) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos: provincia, canton, distrito, direccion '
        });
    }

    pool.query('CALL pa_UpdateUbicacion(?, ?, ?, ?, ?)', [id, provincia, canton, distrito, direccion], (error, results) => {
        if (error) {
            console.error('Error al actualizar ubicacion:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al actualizar ubicacion'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Ubicacion actualizada correctamente',
            data: {
                provincia,
                canton,
                distrito,
                direccion
            }
        });
    });
};


const deleteMethod = (req = request, res = response) => {
    const { id } = req.body; 

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID de ubicacion no proporcionado en el body'
        });
    }

    pool.query('CALL pa_DeleteUbicacion(?)', [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar ubicacion:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al eliminar ubicacion'
            });
        }

        res.json({
            success: true,
            message: `Ubicacion con ID ${id} eliminada correctamente`
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