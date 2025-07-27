const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();

class PersonasModel {
    async getAllPersonas() {
        try {
            const result = await db.query('CALL pa_SelectAllPersona()');
            return result;
        } catch (error) {
            console.error("Error fetching all personas:", error);
            throw error;
        }
    }

    async getPersona(id) {
        try {
            const result = await db.query('CALL pa_SelectPersona(?)', [id]);
            return result[0];
        } catch (error) {
            console.error(`Error consiguiendo por ID ${id}:`, error);
            throw error;
        }
    }

    async postPersona(persona) {
        try {
            const result = await db.query('CALL pa_InsertPersona(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
            return result.insertId;
        } catch (error) {
            console.error("Error insertando persona:", error);
            throw error;
        }
    }

    //aqui estará alguna vez put

    async deletePersona(id) {
        try {
            const result = await db.query('CALL pa_DeletePersona(?)', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error(`Error borrando por persona por ID ${id}:`, error);
            throw error;
        }
    }
}