const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");


const getAllMethod = (req = request, res = response) => {
    pool.query("CALL pa_SelectAllInventario()", (error, results) => {
        if (error) {
            console.error("Error en getAllMethod:", error);
            return res.status(500).json({
                success: false,
                error: "Error al obtener el inventario",
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

    pool.query("CALL pa_SelectInventario(?)", [id], (error, results) => {
        if (error) {
            console.error("Error en getMethod:", error);
            return res.status(500).json({
                success: false,
                error: "Error al obtener el registro de inventario",
            });
        }

        if (results[0].length === 0) {
            return res.status(404).json({
                success: false,
                message: "Registro de inventario no encontrado",
            });
        }

        res.json({
            success: true,
            data: results[0][0],
        });
    });
};

const postMethod = (req = request, res = response) => {
    const { idAlbergue, fecha, articulo, cantidad, estado, comentario } = req.body;

    if (!idAlbergue || !fecha || !articulo || !cantidad || !estado || !comentario) {
        return res.status(400).json({
            success: false,
            message: "Faltan datos obligatorios",
        });
    }

    pool.query(
        "CALL pa_InsertInventario(?, ?, ?, ?, ?, ?)",
        [idAlbergue, fecha, articulo, cantidad, estado, comentario],
        (error, results) => {
            if (error) {
                console.error("Error al insertar inventario:", error);
                return res.status(500).json({
                    success: false,
                    error: "Error al insertar inventario",
                });
            }

            res.status(201).json({
                success: true,
                message: "Inventario insertado correctamente",
                data: {
                    id: results[0][0].id,
                    idAlbergue,
                    fecha,
                    articulo,
                    cantidad,
                    estado,
                    comentario,
                },
            });
        }
    );
};

const putMethod = (req = request, res = response) => {
    const { id, idAlbergue, fecha, articulo, cantidad, estado, comentario } = req.body;

    if (!id || !idAlbergue || !fecha || !articulo || !cantidad || !estado || !comentario) {
        return res.status(400).json({
            success: false,
            message: "Faltan datos para actualizar el inventario",
        });
    }

    pool.query(
        "CALL pa_UpdateInventario(?, ?, ?, ?, ?, ?, ?)",
        [id, idAlbergue, fecha, articulo, cantidad, estado, comentario],
        (error, results) => {
            if (error) {
                console.error("Error al actualizar inventario:", error);
                return res.status(500).json({
                    success: false,
                    error: "Error al actualizar inventario",
                });
            }

            res.json({
                success: true,
                message: "Inventario actualizado correctamente",
                data: {
                    id,
                    idAlbergue,
                    fecha,
                    articulo,
                    cantidad,
                    estado,
                    comentario,
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
            message: "ID no proporcionado",
        });
    }

    pool.query("CALL pa_DeleteInventario(?)", [id], (error, results) => {
        if (error) {
            console.error("Error al eliminar inventario:", error);
            return res.status(500).json({
                success: false,
                error: "Error al eliminar inventario",
            });
        }

        res.json({
            success: true,
            message: `Inventario con ID ${id} eliminado correctamente`,
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