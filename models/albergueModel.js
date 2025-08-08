//Cambios Emerson
const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class albergueModel {
  async getAllAlbergues() {
    try {
      return await db.query("CALL pa_SelectAllAlbergue();");
    } catch (error) {
      console.error("Error en getAllAlbergues: ", error);
      throw error;
    }
  }

  async getAlbergue(id) {
    try {
      return await db.query("CALL pa_SelectAlbergue(?);", [id]);
    } catch (error) {
      console.error("Error en getAmenaza: ", error);
      throw error;
    }
  }

  async deleteAlbergue(id) {
    try {
      return await db.query("CALL pa_DeleteAlbergue(?);", [id]);
    } catch (error) {
      console.error("Error en deleteAlbergue: ", error);
      throw error;
    }
  }

  //     async updateAlbergue(id, albergueData) {
  //     const { nombre, direccion, capacidad, telefono } = albergueData;
  //     try {
  //       const query = `
  //         UPDATE albergues
  //         SET nombre = ?, direccion = ?, capacidad = ?, telefono = ?
  //         WHERE id = ?`;
  //       const [result] = await pool.query(query, [nombre, direccion, capacidad, telefono, id]);
  //       return result;
  //     } catch (error) {
  //       throw new Error('Error al actualizar el albergue: ' + error.message);
  //     }
  //   }

  async postAlbergue(Albergue) {
    try {
      const query = `
            CALL pa_InsertAlbergue(
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            );
        `;

      const values = [
        Albergue.idAlbergue,
        Albergue.nombre,
        Albergue.region,
        Albergue.provincia,
        Albergue.canton,
        Albergue.distrito,
        Albergue.direccion,
        Albergue.tipoEstablecimiento,
        Albergue.administrador,
        Albergue.telefono,
        Albergue.capacidadPersonas,
        Albergue.capacidadColectiva,
        Albergue.cantidadFamilias,
        Albergue.ocupacion,
        Albergue.egresos,
        Albergue.sospechososSanos,
        Albergue.otros,
        Albergue.coordenadaX,
        Albergue.coordenadaY,
        Albergue.tipoAlbergue,
        Albergue.condicionAlbergue,
        Albergue.especificacion,
        Albergue.detalleCondicion,
        Albergue.cocina,
        Albergue.duchas,
        Albergue.serviciosSanitarios,
        Albergue.bodega,
        Albergue.menajeMobiliario,
        Albergue.tanqueAgua,
        Albergue.areaTotalM2,
        Albergue.seccion,
        Albergue.requerimientosTecnicos,
        Albergue.costoRequerimientosTecnicos,
        Albergue.idMunicipalidad,
        Albergue.color,
        Albergue.idPedidoAbarrote,
        Albergue.idUsuarioCreacion,
      ];

      return await db.query(query, values);
    } catch (error) {
      console.error("Error en postAlbergue: ", error);
      throw error;
    }
  }

  async getForIdAlbergue(id) {
    try {
      return await db.query("CALL pa_ConsultarAlberguePorId(?);", [id]);
    } catch (error) {
      console.error("Error al encontrar el albergue: ", error);
      throw error;
    }
  }

  async getForNombreAlbergue(nombre) {
    try {
      return await db.query("CALL pa_ConsultarAlberguePorNombre(?);", [nombre]);
    } catch (error) {
      console.error("Error al encontrar el albergue: ", error);
      throw error;
    }
  }

  async getForDistritoAlbergue(distrito) {
    try {
      return await db.query("CALL pa_ConsultarAlberguePorDistrito(?);", [
        distrito,
      ]);
    } catch (error) {
      console.error("Error al encontrar el albergue por distrito: ", error);
      throw error;
    }
  }

  async getForCantonAlbergue(canton) {
    try {
      return await db.query("CALL pa_ConsultarAlberguePorCanton(?);", [canton]);
    } catch (error) {
      console.error("Error al encontrar el albergue por canton: ", error);
      throw error;
    }
  }

  async getForProvinciaAlbergue(provincia) {
    try {
      return await db.query("CALL pa_ConsultarAlberguePorProvincia(?);", [
        provincia,
      ]);
    } catch (error) {
      console.error("Error al encontrar el albergue por provincia: ", error);
      throw error;
    }
  }

  async getResumenAlberguesColor(color) {
    try {
      return await db.query("CALL pa_ResumenAlberguesColor(?);", [color]);
    } catch (error) {
      console.error("Error al encontrar el albergue por color: ", error);
      throw error;
    }
  }

  async getAllAlberguesPorUsuario(idUsuario) {
    try {
      return await db.query("CALL pa_SelectAllAlberguesPorUsuario(?);", [
        idUsuario,
      ]);
    } catch (error) {
      console.error("Error al encontrar el albergue por usuario: ", error);
      throw error;
    }
  }
}

    


module.exports = new albergueModel();



