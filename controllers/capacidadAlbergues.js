const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");

// Obtener todos los registros
const getAllMethod = async (req = request, res = response) => {
  try {
    const [results] = await pool.query("CALL pa_SelectAllCapacidadAlbergue()");
    res.json({ success: true, data: results[0] });
  } catch (error) {
    console.error("Error en getAllMethod:", error);
    return res.status(500).json({ success: false, error: "Error al obtener capacidades" });
  }
};

// Obtener un registro por ID
const getMethod = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "ID requerido" });
  }

  try {
    const [results] = await pool.query("CALL pa_SelectCapacidadAlbergue(?)", [id]);

    if (!results || !results[0] || results[0].length === 0) {
      return res.status(404).json({ success: false, message: "Registro no encontrado" });
    }

    res.json({ success: true, data: results[0] });
  } catch (error) {
    console.error("Error en getMethod:", error);
    res.status(500).json({ success: false, error: "Error al obtener capacidad" });
  }
};

// Crear nuevo registro
const postMethod = async (req = request, res = response) => {
  let {
    idAlbergue,
    capacidadPersonas,
    capacidadColectiva,
    cantidadFamilias,
    ocupacion,
    egresos,
    sospechososSanos,
    otros,
  } = req.body;

  if (
    !capacidadPersonas ||
    !capacidadColectiva ||
    !cantidadFamilias ||
    !ocupacion ||
    !egresos
  ) {
    return res.status(400).json({
      success: false,
      message: "Faltan campos obligatorios",
    });
  }
  idAlbergue = idAlbergue ?? null;
  sospechososSanos = sospechososSanos ?? null;
  otros = otros ?? null;

  try {
    const [results] = await pool.query(
      "CALL pa_InsertCapacidadAlbergue(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        idAlbergue,
        capacidadPersonas,
        capacidadColectiva,
        cantidadFamilias,
        ocupacion,
        egresos,
        sospechososSanos,
        otros,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Registro creado correctamente",
      data: {
        id: results[0][0].id,
        idAlbergue,
        capacidadPersonas,
        capacidadColectiva,
        cantidadFamilias,
        ocupacion,
        egresos,
        sospechososSanos,
        otros,
      },
    });
  } catch (error) {
    console.error("Error en insertCapacidadAlbergueMethod:", error);
    res.status(500).json({
      success: false,
      error: "Error al crear registro",
      details: error.message,
    });
  }
};

// Actualizar un registro
const putMethod = (req = request, res = response) => {
  const {
    idAlbergue,
    capacidadPersonas,
    capacidadColectiva,
    cantidadFamilias,
    ocupacion,
    egresos,
    sospechososSanos,
    otros,
  } = req.body;

  if (
    id == null ||
    capacidad_personas == null ||
    capacidad_colectiva == null ||
    cantidad_familias == null ||
    ocupacion == null ||
    egresos == null ||
    sospechosos_sanos == null
  ) {
    return res.status(400).json({
      success: false,
      message: "Faltan campos obligatorios o el ID",
    });
  }

  pool.query(
    "CALL pa_UpdateCapacidadAlbergue(?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id,
      capacidad_personas,
      capacidad_colectiva,
      cantidad_familias,
      ocupacion,
      egresos,
      sospechosos_sanos,
      otros,
    ],
    (error, results) => {
      if (error) {
        console.error("Error en putMethod:", error);
        return res
          .status(500)
          .json({ success: false, error: "Error al actualizar registro" });
      }

      res.json({
        success: true,
        message: "Registro actualizado correctamente",
      });
    }
  );
};

// Eliminar registro
const deleteMethod = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID requerido para eliminar",
    });
  }

  try {
    const [results] = await pool.query("CALL pa_DeleteCapacidadAlbergue(?)", [id]);

    // Opcional: verificar si realmente se eliminó algo
    if (!results || results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró registro con ID ${id}`,
      });
    }

    res.json({
      success: true,
      message: `Registro con ID ${id} eliminado correctamente`,
    });
  } catch (error) {
    console.error("Error en deleteCapacidadAlbergueMethod:", error);
    res.status(500).json({
      success: false,
      error: "Error al eliminar registro",
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
