const { request, response } = require('express');
const { pool } = require('../MySQL/basedatos')

const getAllMethod = (req = request, res = response) => {
    pool.query('CALL pa_SelectAllCondicionesSalud', (error, results) => {
        if (error) {
            console.error('Error en getAllMethod:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al obtener condiciones de salud'
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
    pool.query('CALL pa_SelectCondicionesSalud(?)', [id], (error, results) => {
        if (error) {
            console.error('Error en getMethod:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al obtener condiciones de salud'
            });
        }

        if (results[0].length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Condiciones de salud no encontrada'
            });
        }

        res.json({
            success: true,
            data: results[0][0]
        });
    });
};


const postMethod = (req = request, res = response) => {
    const { descripcion } = req.body;

    if (!descripcion == null) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos: descripcion '
        });
    }

    pool.query('CALL pa_InsertCondicionesSalud(?)', [descripcion], (error, results) => {
        if (error) {
            console.error('Error al insertar condiciones de salud:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al insertar ubicondicones de salud'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Condiciones de salud insertada correctamente',
            data: {
               descripcion
            }
        });
    });
};

const putMethod = (req = request, res = response) => {
    const {id} = req.body;
    const {descripcion } = req.body;

    if (!id || !descripcion == null) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos: descripcion '
        });
    }

    pool.query('CALL pa_UpdateCondicionesSalud(?, ?)', [id, descripcion], (error, results) => {
        if (error) {
            console.error('Error al actualizar condiciones de salud:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al actualizar condiciones de salud'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Condiciones de salud actualizada correctamente',
            data: {
                descripcion
            }
        });
    });
};


const deleteMethod = (req = request, res = response) => {
    const { id } = req.params; 

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID de condiciones de salud no proporcionado en el body'
        });
    }

    pool.query('CALL pa_DeleteCondicionesSalud(?)', [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar condiciones de salud:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al eliminar condiciones de salud'
            });
        }

        res.json({
            success: true,
            message: `Condiciones de salud con ID ${id} eliminada correctamente`
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