const { request, response } = require("express");
const pool = require("../MySQL/basedatos");

const postMethod = async (req = request, res = response) => {
  const { personas } = req.body;

  if (!personas || !Array.isArray(personas) || personas.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Se esperaba un arreglo de personas en el cuerpo de la solicitud.",
    });
  }

  const resultados = [];
  const errores = [];

  const insertPersona = (persona, index) => {
    return new Promise((resolve) => {
      try {
        let {
          tieneCondicionSalud,
          descripcionCondicionSalud = null,
          discapacidad,
          tipoDiscapacidad = null,
          subtipoDiscapacidad = null,
          paisOrigen = null,
          autoidentificacionCultural = null,
          puebloIndigena = null,
          firma,
          idFamilia,
          nombre,
          primerApellido,
          segundoApellido,
          tipoIdentificacion,
          numeroIdentificacion,
          nacionalidad,
          parentesco,
          esJefeFamilia,
          fechaNacimiento,
          genero,
          sexo,
          telefono,
          contactoEmergencia = null,
          observaciones = null,
          estaACargoMenor,
          idUsuarioCreacion,
        } = persona;

        if (
          tieneCondicionSalud === undefined ||
          discapacidad === undefined ||
          firma === undefined ||
          idFamilia === undefined ||
          nombre === undefined ||
          primerApellido === undefined ||
          segundoApellido === undefined ||
          tipoIdentificacion === undefined ||
          numeroIdentificacion === undefined ||
          nacionalidad === undefined ||
          parentesco === undefined ||
          esJefeFamilia === undefined ||
          fechaNacimiento === undefined ||
          genero === undefined ||
          sexo === undefined ||
          telefono === undefined ||
          estaACargoMenor === undefined ||
          idUsuarioCreacion === undefined
        ) {
          errores.push({ index, message: "Faltan datos requeridos", datos: persona });
          return resolve();
        }

        if (firma.startsWith("data:")) {
          firma = firma.split(",")[1];
        }

        firma = Buffer.from(firma, "base64");

        if (!firma || firma.length === 0) {
          errores.push({ index, message: "Firma inválida o vacía" });
          return resolve();
        }

        pool.query(
          "CALL pa_InsertPersona(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            tieneCondicionSalud,
            descripcionCondicionSalud,
            discapacidad,
            tipoDiscapacidad,
            subtipoDiscapacidad,
            paisOrigen,
            autoidentificacionCultural,
            puebloIndigena,
            firma,
            idFamilia,
            nombre,
            primerApellido,
            segundoApellido,
            tipoIdentificacion,
            numeroIdentificacion,
            nacionalidad,
            parentesco,
            esJefeFamilia,
            fechaNacimiento,
            genero,
            sexo,
            telefono,
            contactoEmergencia,
            observaciones,
            estaACargoMenor,
            idUsuarioCreacion,
          ],
          (error, results) => {
            if (error) {
              console.error(`Error al insertar persona en índice ${index}:`, error);
              errores.push({
                index,
                error: error.message || "Error al insertar persona",
              });
            } else if (Array.isArray(results) && results[0] && results[0][0]) {
              resultados.push({
                index,
                id: results[0][0].id,
                message: "Persona registrada correctamente",
              });
            } else {
              errores.push({ index, message: "Respuesta inesperada del procedimiento" });
            }
            resolve();
          }
        );
      } catch (err) {
        console.error(`Excepción en insertPersona [${index}]:`, err);
        errores.push({ index, error: err.message || "Error desconocido" });
        resolve();
      }
    });
  };

  try {
    await Promise.all(personas.map(insertPersona));

    const statusCode =
      errores.length === personas.length
        ? 500
        : errores.length > 0
        ? 207
        : 201;

    return res.status(statusCode).json({
      success: errores.length === 0,
      resultados,
      errores,
    });
  } catch (err) {
    console.error("Error inesperado en postMethod:", err);
    return res.status(500).json({
      success: false,
      message: "Error interno en el servidor",
    });
  }
};

module.exports = {
  postMethod,
};
