const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");


const getAllMethod = (req = request, res = response) => {
    pool.query("CALL pa_SelectAllMascotas()", (error, results) => {
        if (error) {
            console.error("Error en getAllMethod:", error);
            return res.status(500).json({
                success: false,
                error: "Error al obtener mascotas",
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

    pool.query("CALL pa_SelectMascota(?)", [id], (error, results) => {
        if (error) {
            console.error("Error en getMethod:", error);
            return res.status(500).json({
                success: false,
                error: "Error al obtener mascota",
            });
        }

        if (results[0].length === 0) {
            return res.status(404).json({
                success: false,
                message: "Mascota no encontrada",
            });
        }

        res.json({
            success: true,
            data: results[0][0],
        });
    });
};

const postMethod = (req = request, res = response) => {
    const { idFamilia, tipo, tamaño, nombreMascota } = req.body;

    if (!idFamilia || !tipo || !tamaño || !nombreMascota) {
        return res.status(400).json({
            success: false,
            message: "Faltan datos obligatorios",
        });
    }

    pool.query(
        "CALL pa_InsertMascota(?, ?, ?, ?)",
        [idFamilia, tipo, tamaño, nombreMascota],
        (error, results) => {
            if (error) {
                console.error("Error al insertar mascota:", error);
                return res.status(500).json({
                    success: false,
                    error: "Error al insertar mascota",
                });
            }

            res.status(201).json({
                success: true,
                message: "Mascota insertada correctamente",
                data: {
                    id: results[0][0].id,
                    idFamilia,
                    tipo,
                    tamaño,
                    nombreMascota,
                },
            });
        }
    );
};

const putMethod = (req = request, res = response) => {
    const { id, idFamilia, tipo, tamaño, nombreMascota } = req.body;

    if (!id || !idFamilia || !tipo || !tamaño || !nombreMascota) {
        return res.status(400).json({
            success: false,
            message: "Faltan datos obligatorios para actualizar",
        });
    }

    pool.query(
        "CALL pa_UpdateMascota(?, ?, ?, ?, ?)",
        [id, idFamilia, tipo, tamaño, nombreMascota],
        (error, results) => {
            if (error) {
                console.error("Error al actualizar mascota:", error);
                return res.status(500).json({
                    success: false,
                    error: "Error al actualizar mascota",
                });
            }

            res.json({
                success: true,
                message: "Mascota actualizada correctamente",
                data: {
                    id,
                    idFamilia,
                    tipo,
                    tamaño,
                    nombreMascota,
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
            message: "ID de mascota no proporcionado",
        });
    }

    pool.query("CALL pa_DeleteMascota(?)", [id], (error, results) => {
        if (error) {
            console.error("Error al eliminar mascota:", error);
            return res.status(500).json({
                success: false,
                error: "Error al eliminar mascota",
            });
        }

        res.json({
            success: true,
            message: `Mascota con ID ${id} eliminada correctamente`,
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