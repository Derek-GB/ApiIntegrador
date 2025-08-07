const { request, response } = require("express");
const personasService = require("../service/personasService");

const getAllPersonas = async (req = request, res = response) => {
  try {
    const data = await personasService.getAllPersonas();
    res.status(200).json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.error("Error en getAllPersonas:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener las personas; " + error.message,
    });
  }
}

const getAllPersonasByUsuario = async (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: "Se esperaba el parametro idUsuario en la query.",
    });
  }
  try {
    const { idUsuario } = req.params;
    const data = await personasService.getAllPersonasByUsuario(idUsuario);
    if (data[0]?.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Persona no encontrada.",
      });
    }
    return res.status(200).json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.error("Error en getPersona:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener la persona; " + error.message,
    });
  }
}

// Obtener una persona por ID

const getPersona = async (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: "Se esperaba el parametro id en la query.",
    });
  }
  try {
    const { id } = req.params;
    const data = await personasService.getPersona(id);
    if (data[0]?.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Persona no encontrada.",
      });
    }
    return res.status(200).json({
      success: true,
      data: data[0][0],
    });
  } catch (error) {
    console.error("Error en getPersona:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener la persona; " + error.message,
    });
  }
};

const getResumenDiscapacidad = async (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: "Se esperaba el parametro id en la query.",
    });
  }
  try {
    const { id } = req.params;
    const data = await personasService.getResumenDiscapacidad(id);
    if (data[0]?.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Discapacidad no encontrada.",
      });
    }
    return res.status(200).json({
      success: true,
      data: data[0][0],
    });
  } catch (error) {
    console.error("Error en getResumenDiscapacidad:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener la discapacidad; " + error.message,
    });
  }
};

const postPersonas = async (req = request, res = response) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "El cuerpo de la solicitud no puede estar vacío.",
    });
  }
  if (!req.firma || typeof req.firma !== 'object') {
    return res.status(400).json({
      success: false,
      message: "Se esperaba una declaración de firma",
    });
  }
  try {
    ({ personas } = req.body);
    ({ firma } = req);
    const data = await personasService.postPersonas(personas, firma);
    const statusCode =
      data.errores.length === personas.length
        ? 500
        : data.errores.length > 0
        ? 207
        : 201;
    return res.status(statusCode).json({
      success: data.errores.length === 0,
      resultados: data.resultados,
      errores: data.errores,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al registrar personas; " + error.message,
      error: error.message,
    });
  }
};

const deletePersona = async (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: "Se esperaba el parametro id en la query.",
    });
  }
  try {
    const { id } = req.params;
    const data = await personasService.deletePersona(id);
    return res.status(200).json({
      success: true,
      message: "Persona eliminada correctamente",
      data,
    });
  } catch (error) {
    console.error("Error en deletePersona:", error);
    return res.status(500).json({
      success: false,
      error: "Error al eliminar la persona; " + error.message,
    });
  }
};


const getResumenPersonasDinamico = async (req = request, res = response) => {
  const { albergue, sexo, edad } = req.params;

  if (!albergue || !sexo || !edad) {
    return res.status(400).json({
      success: false,
      message: "Se esperaban los parámetros albergue, sexo y edad.",
    });
  }

  try {
    const data = await personasService.getResumenPersonasDinamico(albergue, sexo, edad);

    if (!data[0] || data[0].length === 0) {
      return res.status(404).json({
        success: false,
        message: "Datos no encontrados.",
      });
    }

    return res.status(200).json({
      success: true,
      data: data[0],
    });

  } catch (error) {
    console.error("Error en getResumenPersonasDinamico:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener los datos: " + error.message,
    });
  }
};

module.exports = {
  getAllPersonas,
  getPersona,
  getResumenDiscapacidad,
  postPersonas,
  deletePersona,
  getResumenPersonasDinamico,
  getAllPersonasByUsuario
};
