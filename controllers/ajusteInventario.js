const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");

const getAllMethod = (req = request, res = response) => {
  pool.query("CALL pa_SelectAllAjusteInventario", (error, results) => {
    if (error) {
      console.error("Error en getAllMethod:", error);
      return res.status(500).json({
        success: false,
        error: "Error al obtener los ajustes de inventario",
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
  pool.query("CALL pa_SelectAjusteInventario(?)", [id], (error, results) => {
    if (error) {
      console.error("Error en getMethod:", error);
      return res.status(500).json({
        success: false,
        error: "Error al obtener el ajuste de inventario",
      });
    }
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
  });
};

const postMethod = (req = request, res = response) => {
  const { idProducto, justificacion, cantidadOriginal, cantidadAjustada, fechaCreacion, idUsuarioCreacion } = req.body;

  if (!idProducto || !justificacion || !cantidadOriginal || !cantidadAjustada || !fechaCreacion || !idUsuarioCreacion) {
    return res.status(400).json({
      success: false,
      error: "Todos los campos son obligatorios",
    });
  }

  pool.query(
    "CALL pa_InsertAjusteInventario(?, ?, ?, ?, ?, ?)",
    [idProducto, cantidadOriginal, cantidadAjustada, justificacion, idUsuarioCreacion, fechaCreacion],
    (error, results) => {
      if (error) {
        console.error("Error en postMethod:", error);
        return res.status(500).json({
          success: false,
          error: "Error al registrar el ajuste de inventario",
        });
      }
      res.status(201).json({
        success: true,
        message: "Ajuste de inventario registrado correctamente",
      });
    }
  );
};

module.exports = {
  getAllMethod,
  getMethod,
  postMethod,
};