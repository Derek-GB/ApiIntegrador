const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");

const getAllMethod = async (req = request, res = response) => {
  try {
    const [results] = await pool.query("CALL pa_SelectAllConsumible");
    res.json({
      success: true,
      data: results[0],
    });
  } catch (error) {
    console.error("Error en getAllMethod:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener consumibles",
      details: error.message,
    });
  }
};

const getMethod = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const [results] = await pool.query("CALL pa_SelectConsumible(?)", [id]);

    if (!results || !results[0] || results[0].length === 0) {
      return res.status(404).json({
        success: false,
        message: "Consumible no encontrado",
      });
    }

    res.json({
      success: true,
      data: results[0][0],
    });
  } catch (error) {
    console.error("Error en getMethod:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener consumible",
      details: error.message,
    });
  }
};

const postMethod = async (req = request, res = response) => {
  const { nombre, unidadMedidaNombre, categoriaNombre, cantidad } = req.body;

  if (!nombre || !unidadMedidaNombre || !categoriaNombre || !cantidad) {
    return res.status(400).json({
      success: false,
      message:
        "Faltan datos: nombre, unidadMedidaNombre, categoriaNombre, cantidad",
    });
  }

  try {
    const [results] = await pool.query("CALL pa_InsertConsumible(?, ?, ?, ?)", [
      nombre,
      unidadMedidaNombre,
      categoriaNombre,
      cantidad,
    ]);

    res.status(201).json({
      success: true,
      message: "Consumible insertado correctamente",
      data: {
        id: results[0][0].id,
        nombre,
        unidadMedidaNombre,
        categoriaNombre,
        cantidad,
      },
    });
  } catch (error) {
    console.error("Error al insertar consumible:", error);
    res.status(500).json({
      success: false,
      error: "Error al insertar consumible",
      details: error.message,
    });
  }
};

const deleteMethod = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de consumible no proporcionado en el body",
    });
  }

  try {
    const [results] = await pool.query("CALL pa_DeleteConsumible(?)", [id]);
    if (!results || results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró una consumible con ID ${id}`,
      });
    }

    res.json({
      success: true,
      message: `Consumible con ID ${id} eliminada correctamente`,
    });
  } catch (error) {
    console.error("Error al eliminar consumible:", error);
    res.status(500).json({
      success: false,
      error: "Error al eliminar consumible",
      details: error.message,
    });
  }
};
module.exports = {
  getAllMethod,
  getMethod,
  postMethod,
  // putMethod,
  deleteMethod,
};
