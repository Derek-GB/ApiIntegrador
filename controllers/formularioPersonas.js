const { request, response } = require("express");
const pool = require("../MySQL/basedatos"); // ajusta según la ruta real

// Insertar nueva persona
// const postMethod = (req = request, res = response) => {
//   let {
//     tieneCondicionSalud,
//     descripcionCondicionSalud,

//     discapacidad,
//     tipoDiscapacidad,
//     subtipoDiscapacidad,

//     paisOrigen,
//     autoidentificacionCultural,
//     puebloIndigena,

//     firma,

//     idFamilia,
//     nombre,
//     primerApellido,
//     segundoApellido,
//     tipoIdentificacion,
//     numeroIdentificacion,
//     nacionalidad,
//     parentesco,
//     esJefeFamilia,
//     fechaNacimiento,
//     genero,
//     sexo,
//     telefono,
//     contactoEmergencia,
//     observaciones,
//     estaACargoMenor,
//     idUsuarioCreacion,
//   } = req.body;

//   // Valores opcionales con default
//   contactoEmergencia = contactoEmergencia ?? null;
//   observaciones = observaciones ?? null;
//   descripcionCondicionSalud = descripcionCondicionSalud ?? null;
//   tipoDiscapacidad = tipoDiscapacidad ?? null;
//   subtipoDiscapacidad = subtipoDiscapacidad ?? null;
//   paisOrigen = paisOrigen ?? null;
//   autoidentificacionCultural = autoidentificacionCultural ?? null;
//   puebloIndigena = puebloIndigena ?? null;
//   idUsuarioCreacion = idUsuarioCreacion ?? null;

//   // Validación de campos obligatorios
//   if (
//     tieneCondicionSalud === undefined ||
//     discapacidad === undefined ||
//     firma === undefined ||
//     idFamilia === undefined ||
//     nombre === undefined ||
//     primerApellido === undefined ||
//     segundoApellido === undefined ||
//     tipoIdentificacion === undefined ||
//     numeroIdentificacion === undefined ||
//     nacionalidad === undefined ||
//     parentesco === undefined ||
//     esJefeFamilia === undefined ||
//     fechaNacimiento === undefined ||
//     genero === undefined ||
//     sexo === undefined ||
//     telefono === undefined ||
//     estaACargoMenor === undefined
//     // || idUsuarioCreacion === undefined
//   ) {
//     return res.status(400).json({
//       success: false,
//       message: "Faltan datos requeridos",
//       datosValidados: {
//         tieneCondicionSalud,
//         discapacidad,
//         firma,
//         idFamilia,
//         nombre,
//         primerApellido,
//         segundoApellido,
//         tipoIdentificacion,
//         numeroIdentificacion,
//         nacionalidad,
//         parentesco,
//         esJefeFamilia,
//         fechaNacimiento,
//         genero,
//         sexo,
//         telefono,
//         estaACargoMenor,
//         idUsuarioCreacion,
//       },
//     });
//   }

//   // Ejecutar el procedimiento almacenado
//   pool.query(
//     "CALL pa_InsertPersona(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
//     [
//       tieneCondicionSalud,
//       descripcionCondicionSalud,
//       discapacidad,
//       tipoDiscapacidad,
//       subtipoDiscapacidad,
//       paisOrigen,
//       autoidentificacionCultural,
//       puebloIndigena,
//       firma,
//       idFamilia,
//       nombre,
//       primerApellido,
//       segundoApellido,
//       tipoIdentificacion,
//       numeroIdentificacion,
//       nacionalidad,
//       parentesco,
//       esJefeFamilia,
//       fechaNacimiento,
//       genero,
//       sexo,
//       telefono,
//       contactoEmergencia,
//       observaciones,
//       estaACargoMenor,
//       idUsuarioCreacion,
//     ],
//     (error, results) => {
//       if (error) {
//         console.error("Error en postPersona:", error);
//         return res
//           .status(500)
//           .json({ success: false, error: "Error al insertar persona" });
//       }

//       res.status(201).json({
//         success: true,
//         message: "Persona registrada correctamente",
//         data: { id: results[0][0].id },
//       });
//     }
//   );
// };

const postMethod = async (req = request, res = response) => {
  const personas = req.body;

  if (!Array.isArray(personas) || personas.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Se esperaba un arreglo de personas en el cuerpo de la solicitud.",
    });
  }

  const resultados = [];
  const errores = [];

  for (const [index, persona] of personas.entries()) {
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

    // Validación de campos obligatorios
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
      errores.push({
        index,
        message: "Faltan datos requeridos",
        datos: persona,
      });
      continue;
    }

    try {
      const [results] = await pool.promise().query(
        "CALL pa_InsertPersona(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        ]
      );

      resultados.push({
        index,
        id: results[0][0]?.id ?? null,
        message: "Persona registrada correctamente",
      });
    } catch (error) {
      console.error(`Error al insertar persona en índice ${index}:`, error);
      errores.push({
        index,
        error: error.message || "Error al insertar persona",
      });
    }
  }

  const statusCode = errores.length === personas.length ? 500 : errores.length > 0 ? 207 : 201;

  return res.status(statusCode).json({
    success: errores.length === 0,
    resultados,
    errores,
  });
};

module.exports = {
  postMethod,
};
