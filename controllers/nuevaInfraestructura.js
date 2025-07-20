const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");


const getAllMethod = (req = request, res = response) => {
    pool.query("CALL pa_SelectAllNuevaInfraestructura()", (error, results) => {
        if (error) {
            console.error("Error en getAllMethod:", error);
            return res.status(500).json({
                success: false,
                error: "Error al obtener registros de infraestructura",
            });
        }

        res.json({
            success: true,
            data: results[0],
        });
    });
};

const getMethod = (req = request, res = response) => {
    const { id } = req.params;

    pool.query("CALL pa_SelectNuevaInfraestructura(?)", [id], (error, results) => {
        if (error) {
            console.error("Error en getMethod:", error);
            return res.status(500).json({
                success: false,
                error: "Error al obtener infraestructura",
            });
        }

        if (results[0].length === 0) {
            return res.status(404).json({
                success: false,
                message: "Infraestructura no encontrada",
            });
        }

        res.json({
            success: true,
            data: results[0][0],
        });
    });
};

const postMethod = (req = request, res = response) => {
    let {
        idAlbergue,
        fecha,
        motivo,
        tipo,
        descripcion,
        costoTotal,
    } = req.body;

    if (!idAlbergue || !fecha || !motivo || !tipo || !descripcion || !costoTotal) {
        return res.status(400).json({
            success: false,
            message: "Faltan datos obligatorios",
        });
    }

    pool.query(
        "CALL pa_InsertNuevaInfraestructura(?, ?, ?, ?, ?, ?)",
        [idAlbergue, fecha, motivo, tipo, descripcion, costoTotal],
        (error, results) => {
            if (error) {
                console.error("Error al insertar infraestructura:", error);
                return res.status(500).json({
                    success: false,
                    error: "Error al insertar infraestructura",
                });
            }

            res.status(201).json({
                success: true,
                message: "Infraestructura insertada correctamente",
                data: {
                    id: results[0][0].id,
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

const putMethod = (req = request, res = response) => {
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



const deleteMethod = (req = request, res = response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "ID de infraestructura no proporcionado",
        });
    }

    pool.query("CALL pa_DeleteNuevaInfraestructura(?)", [id], (error, results) => {
        if (error) {
            console.error("Error al eliminar infraestructura:", error);
            return res.status(500).json({
                success: false,
                error: "Error al eliminar infraestructura",
            });
        }

        res.json({
            success: true,
            message: `Infraestructura con ID ${id} eliminada correctamente`,
        });
    });
};

module.exports = {
    getAllMethod,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod,
};