const { request, response } = require("express");
const pool = require("../MySQL/basedatos"); 

const getAllMethod = async (req = request, res = response) => {
  try {
    const [results] = await pool.query("CALL pa_SelectAllAjusteInventario");
    res.json({
      success: true,
      data: results[0], 
    });
  } catch (error) {
    console.error("Error en getAllMethod:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener los ajustes de inventario",
    });
  }
};

const getMethod = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const [results] = await pool.query("CALL pa_SelectAjusteInventario(?)", [id]);

    if (results[0].length === 0) {
      return res.status(404).json({
        success: false,
        error: "Ajuste de inventario no encontrado",
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
      error: "Error al obtener el ajuste de inventario",
    });
  }
};

const postMethod = async (req = request, res = response) => {
  const { idProducto, justificacion, cantidadOriginal, cantidadAjustada, idUsuarioCreacion } = req.body;

  if (!idProducto || !justificacion || !cantidadOriginal || !cantidadAjustada || !idUsuarioCreacion) {
    return res.status(400).json({
      success: false,
      error: "Todos los campos son obligatorios",
    });
  }

  try {
    await pool.query(
      "CALL pa_InsertAjusteInventario(?, ?, ?, ?, ?)",
      [idProducto, cantidadOriginal, cantidadAjustada, justificacion, idUsuarioCreacion]
    );

    res.status(201).json({
      success: true,
      message: "Ajuste de inventario registrado correctamente",
    });
  } catch (error) {
    console.error("Error en postMethod:", error);
    res.status(500).json({
      success: false,
      error: "Error al registrar el ajuste de inventario",
    });
  }
};

module.exports = {
  getAllMethod,
  getMethod,
  postMethod,
};
