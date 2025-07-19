const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");

const getAllMethod = async (req = request, res = response) => {
  try {
    const [results] = await pool.query("CALL pa_SelectAllAmenaza");
    res.json({
      success: true,
      data: results[0],
    });
  } catch (error) {
    console.error("Error en getAllMethod:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener amenazas",
    });
  }
  // Verifica si se encontraron amenazas
  if (!results || !results[0] || results[0].length === 0) {
    return res.status(404).json({
      success: false,
      message: "No se encontraron amenazas",
    });
  }
}

const getMethod = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const [results] = await pool.query("CALL pa_SelectAmenaza(?)", [id]);

    if (!results || results[0].length === 0) {
      return res.status(404).json({
        success: false,
        message: "Amenaza no encontrada",
      });
    }

    res.json({
      success: true,
      data: results[0][0],
    });

  } catch (error) {
    console.error("Error en getAmenazaMethod:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener amenaza",
      details: error.message,
    });
  }
};

const postMethod = async (req = request, res = response) => {
  let { familiaEvento, evento, peligro, idFamilia, idUsuarioCreacion } =
    req.body;

  if (!familiaEvento || !evento) {
    return res.status(400).json({
      success: false,
      message: "Faltan datos: familiaEvento, evento ",
    });
  }
  peligro = peligro ?? null;
  idFamilia = idFamilia ?? null;
  idUsuarioCreacion = idUsuarioCreacion ?? null;

  try {
    const [results] = await pool.query(
      "CALL pa_InsertAmenaza(?, ?, ?, ?, ?)",
      [familiaEvento, evento, peligro, idFamilia, idUsuarioCreacion]
    );

    res.status(201).json({
      success: true,
      message: "Amenaza insertada correctamente",
      data: {
        p_id: results[0][0].id,
        familiaEvento,
        evento,
        peligro,
        idFamilia,
        idUsuarioCreacion,
      },
    });
  } catch (error) {
    console.error("Error al insertar amenaza:", error);
    res.status(500).json({
      success: false,
      error: "Error al insertar amenaza",
      details: error.message,
    });
  }
};

const putMethod = async (req = request, res = response) => {
  const { id } = req.body;
  const { familiaEvento, evento, peligro } = req.body;

  if (!id || !familiaEvento || evento == null || peligro == null) {
    return res.status(400).json({
      success: false,
      message: "Faltan datos: familiaEvento, evento, peligro ",
    });
  }

  try {
    const [results] = await pool.query(
      "CALL pa_UpdateAmenaza(?, ?, ?, ?)",
      [id, familiaEvento, evento, peligro]
    );

    res.status(200).json({
      success: true,
      message: "Amenaza actualizada correctamente",
      data: {
        id,
        familiaEvento,
        evento,
        peligro,
      },
    });
  } catch (error) {
    console.error("Error al actualizar amenaza:", error);
    res.status(500).json({
      success: false,
      error: "Error al actualizar amenaza",
      details: error.message,
    });
  }
};

const deleteMethod = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de amenaza no proporcionado en el body",
    });
  }

  try {
    const [results] = await pool.query("CALL pa_DeleteAmenaza(?)", [id]);
    if (!results || results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró una amenaza con ID ${id}`,
      });
    }

    res.json({
      success: true,
      message: `Amenaza con ID ${id} eliminada correctamente`,
    });
  } catch (error) {
    console.error("Error al eliminar amenaza:", error);
    res.status(500).json({
      success: false,
      error: "Error al eliminar amenaza",
      details: error.message,
    });
  }
};

module.exports = {
  getAllMethod,
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
};
