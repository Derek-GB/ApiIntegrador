const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");
const { put } = require("../routes/productos.route");

const getAllMethod = (req = request, res = response) => {
  pool.query("CALL pa_SelectAllPersona", (error, results) => {
    if (error) {
      console.error("Error en getAllMethod:", error);
      return res
        .status(500)
        .json({ success: false, error: "Error al obtener las personas" });
    }

    const data = results[0].map((persona) => ({
      id: persona.id_INT,
      idFamilia: persona.idFamilia_INT,
      nombreCompleto: persona.nombreCompleto_VARCHAR,
      tipoIdentificacion: persona.tipoIdentificacion_VARCHAR,
      numIdentificacion: persona.numIdentificacion_VARCHAR,
      nacionalidad: persona.nacionalidad_VARCHAR,
      parentesco: persona.parentesco_VARCHAR,
      fechaNacimiento: persona.fechaNacimiento_DATE,
      genero: persona.genero_VARCHAR,
      sexo: persona.sexo_VARCHAR,
      telefono: persona.telefono_VARCHAR,
      idCondicionesEspeciales: persona.idCondicionesEspeciales_INT,
      idCondicionesPoblacionales: persona.idCondicionesPoblacionales_INT,
      idFirma: persona.idFirma_INT,
      contactoEmergencia: persona.contactoEmergencia_VARCHAR,
      observaciones: persona.observaciones_VARCHAR,
    }));

    res.json({
      success: true,
      data: results[0],
    });
  });
};

// Obtener una persona por ID
const getMethod = (req = request, res = response) => {
  const { id } = req.params;

  pool.query("CALL pa_SelectPersona(?)", [id], (error, results) => {
    if (error) {
      console.error("Error en getPersona:", error);
      return res
        .status(500)
        .json({ success: false, error: "Error al obtener persona" });
    }

    if (results[0].length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Persona no encontrada" });
    }

    res.json({ success: true, data: results[0][0] });
  });
};

// Insertar nueva persona
const postMethod = (req = request, res = response) => {
  let {
    idFamilia,
    nombre,
    primerApellido,
    segundoApellido,
    tipoIdentificacion,
    numIdentificacion,
    nacionalidad,
    parentesco,
    fechaNacimiento,
    genero,
    sexo,
    telefono,
    idCondicionesEspeciales,
    idCondicionesPoblacionales,
    idFirma,
    contactoEmergencia,
    observaciones,
    idUsuarioCreacion,
    idUsuarioModificacion,
  } = req.body;

  fechaCreacion = null;
  fechaMofificacion = null;
  idUsuarioCreacion = idUsuarioCreacion ?? null;
  idUsuarioModificacion = idUsuarioModificacion ?? null;
  observaciones = observaciones ?? null;
  contactoEmergencia = contactoEmergencia ?? null;

  if (
    !idFamilia ||
    !nombre ||
    !primerApellido ||
    !segundoApellido ||
    !tipoIdentificacion ||
    !numIdentificacion ||
    !nacionalidad ||
    !parentesco ||
    !fechaNacimiento ||
    !genero ||
    !sexo ||
    !telefono ||
    idCondicionesEspeciales == null ||
    idCondicionesPoblacionales == null ||
    idFirma == null
  ) {
    return res.status(400).json({
      success: false,
      message: "Faltan datos requeridos",
      datosValidados: {
        idFamilia: idFamilia,
        nombre: nombre,
        primerApellido: primerApellido,
        segundoApellido: segundoApellido,
        tipoIdentificacion: tipoIdentificacion,
        numIdentificacion: numIdentificacion,
        nacionalidad: nacionalidad,
        parentesco: parentesco,
        fechaNacimiento: fechaNacimiento,
        genero: genero,
        sexo: sexo,
        telefono: telefono,
        idCondicionesEspeciales: idCondicionesEspeciales,
        idCondicionesPoblacionales: idCondicionesPoblacionales,
        idFirma: idFirma,
      },
    });
  }

  pool.query(
    "CALL pa_InsertPersona(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      idFamilia,
      nombre,
      primerApellido,
      segundoApellido,
      tipoIdentificacion,
      numIdentificacion,
      nacionalidad,
      parentesco,
      fechaNacimiento,
      genero,
      sexo,
      telefono,
      idCondicionesEspeciales,
      idCondicionesPoblacionales,
      idFirma,
      contactoEmergencia,
      observaciones,
      idUsuarioCreacion,
      fechaCreacion,
      idUsuarioModificacion,
      fechaMofificacion,
    ],
    (error, results) => {
      if (error) {
        console.error("Error en postPersona:", error);
        return res
          .status(500)
          .json({ success: false, error: "Error al insertar persona" });
      }

      res
        .status(201)
        .json({
          success: true,
          message: "Persona registrada correctamente",
          data: { id: results[0][0].id },
        });
    }
  );
};

// Actualizar persona por ID
const putMethod = (req = request, res = response) => {
  const {
    idFamilia,
    nombre,
    primerApellido,
    segundoApellido,
    tipoIdentificacion,
    numIdentificacion,
    nacionalidad,
    parentesco,
    fechaNacimiento,
    genero,
    sexo,
    telefono,
    idCondicionesEspeciales,
    idCondicionesPoblacionales,
    idFirma,
    contactoEmergencia,
    observaciones,
    idUsuarioCreacion,
    fechaCreacion,
    idUsuarioModificacion,
    fechaMofificacion,
  } = req.body;

  if (
    !id ||
    !idFamilia ||
    !nombre ||
    !primerApellido ||
    !segundoApellido ||
    !tipoIdentificacion ||
    !numIdentificacion ||
    !nacionalidad ||
    !parentesco ||
    !fechaNacimiento ||
    !genero ||
    !sexo ||
    !telefono ||
    idCondicionesEspeciales == null ||
    idCondicionesPoblacionales == null ||
    idFirma == null ||
    !contactoEmergencia ||
    !observaciones ||
    !idUsuarioCreacion ||
    !fechaCreacion ||
    !idUsuarioModificacion ||
    !fechaMofificacion
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Faltan datos requeridos o el ID" });
  }

  pool.query(
    "CALL pa_UpdatePersona(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      idFamilia,
      nombre,
      primerApellido,
      segundoApellido,
      tipoIdentificacion,
      numIdentificacion,
      nacionalidad,
      parentesco,
      fechaNacimiento,
      genero,
      sexo,
      telefono,
      idCondicionesEspeciales,
      idCondicionesPoblacionales,
      idFirma,
      contactoEmergencia,
      observaciones,
      idUsuarioCreacion,
      fechaCreacion,
      idUsuarioModificacion,
      fechaMofificacion,
    ],
    (error, results) => {
      if (error) {
        console.error("Error en putPersona:", error);
        return res
          .status(500)
          .json({ success: false, error: "Error al actualizar persona" });
      }

      res.status(200).json({
        success: true,
        message: "Persona actualizada correctamente",
      });
    }
  );
};

// Eliminar persona por ID
const deleteMethod = (req = request, res = response) => {
  const { id } = req.params;

  pool.query("CALL pa_DeletePersona(?)", [id], (error, results) => {
    if (error) {
      console.error("Error en deletePersona:", error);
      return res
        .status(500)
        .json({ success: false, error: "Error al eliminar persona" });
    }

    res.json({ success: true, message: "Persona eliminada correctamente" });
  });
};

module.exports = {
  getAllMethod,
  getMethod,
  putMethod,
  postMethod,
  deleteMethod,
};
