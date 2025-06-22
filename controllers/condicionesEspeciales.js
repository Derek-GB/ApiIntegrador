const { request, response } = require('express');
const { pool } = require('../MySQL/basedatos')

const getAllMethod = (req = request, res = response) => {
    pool.query('CALL pa_SelectAllCondicionesEspeciales', (error, results) => {
        if (error) {
            console.error('Error en getAllMethod:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al obtener condiciones especiales'
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
    pool.query('CALL pa_SelectCondicionesEspeciales(?)', [id], (error, results) => {
        if (error) {
            console.error('Error en getMethod:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al obtener condiciones especiales'
            });
        }

        if (results[0].length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Condiciones especiales no encontrada'
            });
        }

        res.json({
            success: true,
            data: results[0][0]
        });
    });
};


const postMethod = (req = request, res = response) => {
    const { discapacidad, tipoDiscapacidad, subtipoDiscapacidad, tiene_condicion_salud, condicion_salud_id } = req.body;

    if (!discapacidad == null || tipoDiscapacidad == null || subtipoDiscapacidad == null || tiene_condicion_salud == null || condicion_salud_id == null) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos: discapacidad, tipoDiscapacidad, subtipoDiscapacidad, tiene_condicion_salud, condicion_salud_id '
        });
    }

    pool.query('CALL pa_InsertCondicionesEspeciales(?, ?, ?, ?, ?)', [discapacidad, tipoDiscapacidad, subtipoDiscapacidad, tiene_condicion_salud, condicion_salud_id], (error, results) => {
        if (error) {
            console.error('Error al insertar condiciones especiales:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al insertar condiciones especiales'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Condiciones especiales insertada correctamente',
            data: {
                discapacidad,
                tipoDiscapacidad,
                subtipoDiscapacidad,
                tiene_condicion_salud,
                condicion_salud_id
            }
        });
    });
};

const putMethod = (req = request, res = response) => {
    const {id} = req.body;
    const {discapacidad, tipoDiscapacidad, subtipoDiscapacidad, tiene_condicion_salud, condicion_salud_id } = req.body;

    if (!id || !discapacidad || tipoDiscapacidad == null || subtipoDiscapacidad == null || tiene_condicion_salud == null || condicion_salud_id == null) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos: discapacidad, tipoDiscapacidad, subtipoDiscapacidad, tiene_condicion_salud, condicion_salud_id '
        });
    }

    pool.query('CALL pa_UpdateCondicionesEspeciales(?, ?, ?, ?, ?, ?)', [id, discapacidad, tipoDiscapacidad, subtipoDiscapacidad, tiene_condicion_salud, condicion_salud_id ], (error, results) => {
        if (error) {
            console.error('Error al actualizar condiciones especiales:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al actualizar condiciones especiales'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Condiciones especiales actualizada correctamente',
            data: {
                discapacidad,
                tipoDiscapacidad,
                subtipoDiscapacidad,
                tiene_condicion_salud,
                condicion_salud_id
            }
        });
    });
};


const deleteMethod = (req = request, res = response) => {
    const { id } = req.body; 

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID de condiciones especiales no proporcionado en el body'
        });
    }

    pool.query('CALL pa_DeleteCondicionesEspeciales(?)', [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar condiciones especiales:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al eliminar ubicacion'
            });
        }

        res.json({
            success: true,
            message: `Condiciones especiales con ID ${id} eliminada correctamente`
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