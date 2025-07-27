const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");
const { put } = require("../routes/productos.route");
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

// const getAllMethod = (req = request, res = response) => {
//   pool.query("CALL pa_SelectAllPersona", (error, results) => {
//     if (error) {
//       console.error("Error en getAllMethod:", error);
//       return res
//         .status(500)
//         .json({ success: false, error: "Error al obtener las personas" });
//     }

//     const data = results[0].map((persona) => ({
//       id: persona.id_INT,
//       idFamilia: persona.idFamilia_INT,
//       nombreCompleto: persona.nombreCompleto_VARCHAR,
//       tipoIdentificacion: persona.tipoIdentificacion_VARCHAR,
//       numIdentificacion: persona.numIdentificacion_VARCHAR,
//       nacionalidad: persona.nacionalidad_VARCHAR,
//       parentesco: persona.parentesco_VARCHAR,
//       fechaNacimiento: persona.fechaNacimiento_DATE,
//       genero: persona.genero_VARCHAR,
//       sexo: persona.sexo_VARCHAR,
//       telefono: persona.telefono_VARCHAR,
//       idCondicionesEspeciales: persona.idCondicionesEspeciales_INT,
//       idCondicionesPoblacionales: persona.idCondicionesPoblacionales_INT,
//       idFirma: persona.idFirma_INT,
//       contactoEmergencia: persona.contactoEmergencia_VARCHAR,
//       observaciones: persona.observaciones_VARCHAR,
//     }));

//     res.json({
//       success: true,
//       data: results[0],
//     });
//   });
// };

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

// const getMethod = (req = request, res = response) => {
//   const { id } = req.params;

//   pool.query("CALL pa_SelectPersona(?)", [id], (error, results) => {
//     if (error) {
//       console.error("Error en getPersona:", error);
//       return res
//         .status(500)
//         .json({ success: false, error: "Error al obtener persona" });
//     }

//     if (results[0].length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Persona no encontrada" });
//     }

//     res.json({ success: true, data: results[0][0] });
//   });
// };

// Insertar nueva persona
// const postMethod = (req = request, res = response) => {
//   let {
//     idFamilia,
//     nombre,
//     primerApellido,
//     segundoApellido,
//     tipoIdentificacion,
//     numIdentificacion,
//     nacionalidad,
//     parentesco,
//     fechaNacimiento,
//     genero,
//     sexo,
//     telefono,
//     idCondicionesEspeciales,
//     idCondicionesPoblacionales,
//     idFirma,
//     contactoEmergencia,
//     observaciones,
//     idUsuarioCreacion,
//     idUsuarioModificacion,
//   } = req.body;

//   fechaCreacion = null;
//   fechaMofificacion = null;
//   idUsuarioCreacion = idUsuarioCreacion ?? null;
//   idUsuarioModificacion = idUsuarioModificacion ?? null;
//   observaciones = observaciones ?? null;
//   contactoEmergencia = contactoEmergencia ?? null;

//   if (
//     !idFamilia ||
//     !nombre ||
//     !primerApellido ||
//     !segundoApellido ||
//     !tipoIdentificacion ||
//     !numIdentificacion ||
//     !nacionalidad ||
//     !parentesco ||
//     !fechaNacimiento ||
//     !genero ||
//     !sexo ||
//     !telefono ||
//     idCondicionesEspeciales == null ||
//     idCondicionesPoblacionales == null ||
//     idFirma == null
//   ) {
//     return res.status(400).json({
//       success: false,
//       message: "Faltan datos requeridos",
//       datosValidados: {
//         idFamilia: idFamilia,
//         nombre: nombre,
//         primerApellido: primerApellido,
//         segundoApellido: segundoApellido,
//         tipoIdentificacion: tipoIdentificacion,
//         numIdentificacion: numIdentificacion,
//         nacionalidad: nacionalidad,
//         parentesco: parentesco,
//         fechaNacimiento: fechaNacimiento,
//         genero: genero,
//         sexo: sexo,
//         telefono: telefono,
//         idCondicionesEspeciales: idCondicionesEspeciales,
//         idCondicionesPoblacionales: idCondicionesPoblacionales,
//         idFirma: idFirma,
//       },
//     });
//   }

//   pool.query(
//     "CALL pa_InsertPersona(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
//     [
//       idFamilia,
//       nombre,
//       primerApellido,
//       segundoApellido,
//       tipoIdentificacion,
//       numIdentificacion,
//       nacionalidad,
//       parentesco,
//       fechaNacimiento,
//       genero,
//       sexo,
//       telefono,
//       idCondicionesEspeciales,
//       idCondicionesPoblacionales,
//       idFirma,
//       contactoEmergencia,
//       observaciones,
//       idUsuarioCreacion,
//       fechaCreacion,
//       idUsuarioModificacion,
//       fechaMofificacion,
//     ],
//     (error, results) => {
//       if (error) {
//         console.error("Error en postPersona:", error);
//         return res
//           .status(500)
//           .json({ success: false, error: "Error al insertar persona" });
//       }

//       res
//         .status(201)
//         .json({
//           success: true,
//           message: "Persona registrada correctamente",
//           data: { id: results[0][0].id },
//         });
//     }
//   );
// };

const postPersonas = async (req = request, res = response) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "El cuerpo de la solicitud no puede estar vacío.",
    });
  }
  try {
    ({ personas } = req.body);
    const data = await personasService.postPersonas(personas);
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

// Insertar un Array de nuevas personas
// const postMethod = async (req = request, res = response) => {
//   const personas = req.body;

//   if (!Array.isArray(personas) || personas.length === 0) {
//     return res.status(400).json({
//       success: false,
//       message:
//         "Se esperaba un arreglo de personas en el cuerpo de la solicitud.",
//     });
//   }

//   const resultados = [];
//   const errores = [];

//   for (const [index, persona] of personas.entries()) {
//     let {
//       idFamilia,
//       nombre,
//       primerApellido,
//       segundoApellido,
//       tipoIdentificacion,
//       numIdentificacion,
//       nacionalidad,
//       parentesco,
//       fechaNacimiento,
//       genero,
//       sexo,
//       telefono,
//       idCondicionesEspeciales,
//       idCondicionesPoblacionales,
//       idFirma,
//       contactoEmergencia = null,
//       observaciones = null,
//       idUsuarioCreacion = null,
//       idUsuarioModificacion = null,
//     } = persona;

//     const fechaCreacion = null;
//     const fechaMofificacion = null;

//     // Validación
//     if (
//       !idFamilia ||
//       !nombre ||
//       !primerApellido ||
//       !segundoApellido ||
//       !tipoIdentificacion ||
//       !numIdentificacion ||
//       !nacionalidad ||
//       !parentesco ||
//       !fechaNacimiento ||
//       !genero ||
//       !sexo ||
//       !telefono ||
//       idCondicionesEspeciales == null ||
//       idCondicionesPoblacionales == null ||
//       idFirma == null
//     ) {
//       errores.push({
//         index,
//         message: "Faltan datos requeridos",
//         datos: persona,
//       });
//       continue;
//     }

//     try {
//       const [results] = await pool
//         .promise()
//         .query(
//           "CALL pa_InsertPersona(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
//           [
//             idFamilia,
//             nombre,
//             primerApellido,
//             segundoApellido,
//             tipoIdentificacion,
//             numIdentificacion,
//             nacionalidad,
//             parentesco,
//             fechaNacimiento,
//             genero,
//             sexo,
//             telefono,
//             idCondicionesEspeciales,
//             idCondicionesPoblacionales,
//             idFirma,
//             contactoEmergencia,
//             observaciones,
//             idUsuarioCreacion,
//             fechaCreacion,
//             idUsuarioModificacion,
//             fechaMofificacion,
//           ]
//         );

//       resultados.push({
//         index,
//         id: results[0][0]?.id ?? null,
//         message: "Persona registrada correctamente",
//       });
//     } catch (error) {
//       console.error(`Error al insertar persona en índice ${index}:`, error);
//       errores.push({
//         index,
//         error: error.message || "Error al insertar persona",
//       });
//     }
//   }

//   const statusCode =
//     errores.length === personas.length ? 500 : errores.length > 0 ? 207 : 201;

//   return res.status(statusCode).json({
//     success: errores.length === 0,
//     resultados,
//     errores,
//   });
// };

// Actualizar persona por ID
// const putMethod = (req = request, res = response) => {
//   const {
//     idFamilia,
//     nombre,
//     primerApellido,
//     segundoApellido,
//     tipoIdentificacion,
//     numIdentificacion,
//     nacionalidad,
//     parentesco,
//     fechaNacimiento,
//     genero,
//     sexo,
//     telefono,
//     idCondicionesEspeciales,
//     idCondicionesPoblacionales,
//     idFirma,
//     contactoEmergencia,
//     observaciones,
//     idUsuarioCreacion,
//     fechaCreacion,
//     idUsuarioModificacion,
//     fechaMofificacion,
//   } = req.body;

//   if (
//     !id ||
//     !idFamilia ||
//     !nombre ||
//     !primerApellido ||
//     !segundoApellido ||
//     !tipoIdentificacion ||
//     !numIdentificacion ||
//     !nacionalidad ||
//     !parentesco ||
//     !fechaNacimiento ||
//     !genero ||
//     !sexo ||
//     !telefono ||
//     idCondicionesEspeciales == null ||
//     idCondicionesPoblacionales == null ||
//     idFirma == null ||
//     !contactoEmergencia ||
//     !observaciones ||
//     !idUsuarioCreacion ||
//     !fechaCreacion ||
//     !idUsuarioModificacion ||
//     !fechaMofificacion
//   ) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Faltan datos requeridos o el ID" });
//   }

//   pool.query(
//     "CALL pa_UpdatePersona(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
//     [
//       idFamilia,
//       nombre,
//       primerApellido,
//       segundoApellido,
//       tipoIdentificacion,
//       numIdentificacion,
//       nacionalidad,
//       parentesco,
//       fechaNacimiento,
//       genero,
//       sexo,
//       telefono,
//       idCondicionesEspeciales,
//       idCondicionesPoblacionales,
//       idFirma,
//       contactoEmergencia,
//       observaciones,
//       idUsuarioCreacion,
//       fechaCreacion,
//       idUsuarioModificacion,
//       fechaMofificacion,
//     ],
//     (error, results) => {
//       if (error) {
//         console.error("Error en putPersona:", error);
//         return res
//           .status(500)
//           .json({ success: false, error: "Error al actualizar persona" });
//       }

//       res.status(200).json({
//         success: true,
//         message: "Persona actualizada correctamente",
//       });
//     }
//   );
// };

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

// Eliminar persona por ID
// const deleteMethod = (req = request, res = response) => {
//   const { id } = req.params;

//   pool.query("CALL pa_DeletePersona(?)", [id], (error, results) => {
//     if (error) {
//       console.error("Error en deletePersona:", error);
//       return res
//         .status(500)
//         .json({ success: false, error: "Error al eliminar persona" });
//     }

//     res.json({ success: true, message: "Persona eliminada correctamente" });
//   });
// };

module.exports = {
  getAllPersonas,
  getPersona,
  postPersonas,
  deletePersona,
};
