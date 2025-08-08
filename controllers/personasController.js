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
  if (!req.params || !req.params.idAlbergue) {
    return res.status(400).json({
      success: false,
      message: "Se esperaba el parámetro idAlbergue en la URL.",
    });
  }

  try {
    const { idAlbergue } = req.params;
    const data = await personasService.getResumenDiscapacidad(idAlbergue);

    if (!data[0] || data[0].length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron personas con discapacidad para este albergue.",
      });
    }

    return res.status(200).json({
      success: true,
      data: data[0],
      message: `Se encontraron ${data[0].length} personas con discapacidad.`
    });
  } catch (error) {
    console.error("Error en getPersonasConDiscapacidad:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener las personas con discapacidad: " + error.message,
    });
  }
};

const postPersonas = async (req = request, res = response) => {
  // Crear objeto de debug que se enviará al frontend
  const debugInfo = {
    timestamp: new Date().toISOString(),
    requestInfo: {
      bodyPersonas: req.body.personas ? "existe" : "no existe",
      firma: req.firma ? JSON.stringify(req.firma, null, 2) : "no existe",
      file: req.file ? "existe" : "no existe",
      bodyKeys: req.body ? Object.keys(req.body) : "no body"
    }
  };

  // Log en servidor (opcional, para mantener)
  console.log("=== DEBUG COMPLETO ===");
  console.log("req.body.personas:", req.body.personas ? "existe" : "no existe");
  console.log("req.firma:", JSON.stringify(req.firma, null, 2));
  console.log("req.file:", req.file ? "existe" : "no existe");
  console.log("=====================");

  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "El cuerpo de la solicitud no puede estar vacío.",
      debug: {
        ...debugInfo,
        error: "Body vacío",
        step: "Validación inicial"
      }
    });
  }

  // El middleware ya debería haber creado req.firma
  if (!req.firma || typeof req.firma !== 'object') {
    return res.status(400).json({
      success: false,
      message: "Error procesando firma - middleware no ejecutado correctamente",
      debug: {
        ...debugInfo,
        error: "Firma inválida",
        step: "Validación firma",
        firmaType: typeof req.firma
      }
    });
  }

  try {
    let personas;
    
    // Agregar info del parseo al debug
    debugInfo.parseInfo = {
      personasRaw: req.body.personas ? "existe" : "no existe",
      personasLength: req.body.personas ? req.body.personas.length : 0
    };

    // Parsear personas del FormData
    if (!req.body.personas) {
      return res.status(400).json({
        success: false,
        message: "No se encontraron datos de personas.",
        debug: {
          ...debugInfo,
          error: "No hay datos de personas",
          step: "Validación personas"
        }
      });
    }

    try {
      personas = JSON.parse(req.body.personas);
      debugInfo.parseInfo.parseSuccess = true;
      debugInfo.parseInfo.personasParsed = personas.length;
    } catch (parseError) {
      return res.status(400).json({
        success: false,
        message: "Error parseando datos de personas: " + parseError.message,
        debug: {
          ...debugInfo,
          error: parseError.message,
          step: "Parse JSON personas",
          parseInfo: {
            ...debugInfo.parseInfo,
            parseSuccess: false,
            parseError: parseError.message
          }
        }
      });
    }

    if (!Array.isArray(personas)) {
      return res.status(400).json({
        success: false,
        message: "Se esperaba un array de personas.",
        debug: {
          ...debugInfo,
          error: "Personas no es array",
          step: "Validación array",
          personasType: typeof personas
        }
      });
    }

    // Agregar más info de procesamiento
    debugInfo.processInfo = {
      personasCount: personas.length,
      firmaExists: req.firma.exists,
      processingStep: "Llamando al servicio"
    };

    console.log("Procesando", personas.length, "personas");
    console.log("Firma exists:", req.firma.exists);

    const data = await personasService.postPersonas(personas, req.firma);
    
    // Agregar info del resultado
    debugInfo.resultInfo = {
      resultadosCount: data.resultados ? data.resultados.length : 0,
      erroresCount: data.errores ? data.errores.length : 0,
      serviceCallSuccess: true
    };

    const statusCode =
      data.errores.length === personas.length
        ? 500
        : data.errores.length > 0
        ? 207
        : 201;

    debugInfo.responseInfo = {
      statusCode: statusCode,
      finalSuccess: data.errores.length === 0,
      step: "Respuesta final"
    };

    return res.status(statusCode).json({
      success: data.errores.length === 0,
      resultados: data.resultados,
      errores: data.errores,
      // Debug info que se verá en el frontend
      debug: debugInfo
    });

  } catch (error) {
    console.error("Error en postPersonas controller:", error);
    
    return res.status(500).json({
      success: false,
      message: "Error al registrar personas; " + error.message,
      error: error.message,
      debug: {
        ...debugInfo,
        error: error.message,
        stack: error.stack,
        step: "Error catch general",
        errorInfo: {
          name: error.name,
          message: error.message,
          cause: error.cause || "Sin causa específica"
        }
      }
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


const getResumenPersonasPorAlbergue = (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({ success: false, error: "Se esperaba el parametro idAlberguePersona en la query" });
  }
  const { idAlberguePersona } = req.params;
  personasService. getResumenPersonasPorAlbergue(idAlberguePersona)
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontraron personas para el albergue especificado.",
        });
      }
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((error) => {
      console.error("Error al obtener albergue por persona:", error);
      return res.status(500).json({
        success: false,
        error: "Error al obtener albergue por persona; " + error.message,
      });
    });
}

module.exports = {
  getAllPersonas,
  getPersona,
  getResumenDiscapacidad,
  postPersonas,
  deletePersona,
  getResumenPersonasPorAlbergue,
  getAllPersonasByUsuario
};
