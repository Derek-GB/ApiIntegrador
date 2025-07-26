const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");
const nuevaInfraestructuraService = require('../service/nuevaInfraestructuraService');

const getAllNuevaInfraestructura = async (req = request, res = response) => {
    try {
        const data = await nuevaInfraestructuraService.getAllNuevaInfraestructura();
        res.json({
            success: true,
            data: data[0],
            message: "Nueva infraestructura obtenida exitosamente",
        });
    } catch (error) {
        console.error("Error en getAllNuevaInfraestructura:", error);
        return res.status(500).json({
            success: false,
            error: "Error al obtener registros de infraestructura",
        });
    }
};

const getNuevaInfraestructura = async (req = request, res = response) => {
    const { id } = req.body;
    try {
        const data = await nuevaInfraestructuraService.getNuevaInfraestructura(id);
        res.json({
            success: true,
            data: data[0][0],
        });
    } catch (error) {
        console.error("Error en getNuevaInfraestructura:", error);
        if (error.message === 'ID de infraestructura debe ser un número válido mayor a 0') {
            return res.status(400).json({
                success: false,
                message: "ID de infraestructura debe ser un número válido mayor a 0",
            });
        }
        if (results[0].length === 0) {
            return res.status(404).json({
                success: false,
                message: "Infraestructura no encontrada",
            });
        }
        return res.status(500).json({
            success: false,
            error: "Error al obtener infraestructura",
        });
    }
};

const postNuevaInfraestructura = async (req = request, res = response) => {
    let {
        idAlbergue,
        fecha,
        motivo,
        tipo,
        descripcion,
        costoTotal,
    } = req.body;
    try {
        const data = await nuevaInfraestructuraService.postNuevaInfraestructura(idAlbergue, fecha, motivo, tipo, descripcion, costoTotal);
        res.json({
                success: true,
                message: "Infraestructura insertada correctamente",
                data: {
                    id: data[0][0].id,
                    idAlbergue,
                    fecha,
                    motivo,
                    tipo,
                    descripcion,
                    costoTotal,
                },
            });
    } catch (error) {
        console.error("Error al insertar infraestructura:", error);
        if (error.message.includes('Faltan datos obligatorios')) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            error: "Error al insertar infraestructura",
        });
    }
};

const putNuevaInfraestructura = (req = request, res = response) => {
    const { id, idAlbergue, fecha, motivo, tipo, descripcion, costoTotal } = req.body;

    if (!id || !idAlbergue || !fecha || !motivo || !tipo || !descripcion || !costoTotal) {
        return res.status(400).json({
            success: false,
            message: "Faltan datos obligatorios para actualizar",
        });
    }

    pool.query(
        "CALL pa_UpdateNuevaInfraestructura(?, ?, ?, ?, ?, ?, ?)",
        [id, idAlbergue, fecha, motivo, tipo, descripcion, costoTotal],
        (error, results) => {
            if (error) {
                console.error("Error al actualizar infraestructura:", error);
                return res.status(500).json({
                    success: false,
                    error: "Error al actualizar infraestructura",
                });
            }

            res.json({
                success: true,
                message: "Infraestructura actualizada correctamente",
                data: {
                    id,
                    idAlbergue,
                    fecha,
                    motivo,
                    tipo,
                    descripcion,
                    costoTotal,
                },
            });
        }
    );
};

const deleteNuevaInfraestructura = async (req = request, res = response) => {
    const { id } = req.body;
    try {
        const data = await nuevaInfraestructuraService.deleteNuevaInfraestructura(id);
        res.json({
            success: true,
            message: `Infraestructura con ID ${id} eliminada correctamente`,
        });
    } catch (error) {
        console.error("Error al eliminar infraestructura:", error);
        if (error.message === 'ID de infraestructura es requerido') {
            return res.status(400).json({
                success: false,
                message: "ID de infraestructura no proporcionado",
            });
        }
        return res.status(500).json({
                success: false,
                error: "Error al eliminar infraestructura",
            });
    }
};

module.exports = {
    getAllNuevaInfraestructura,
    getNuevaInfraestructura,
    postNuevaInfraestructura,
    putNuevaInfraestructura,
    deleteNuevaInfraestructura
};