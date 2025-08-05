//Cambios Emerson
const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class albergueModel {
    async getAllAlbergues() {
        try {
            return await db.query('CALL pa_SelectAllAlbergue();')
        } catch (error) {
            console.error("Error en getAllAlbergues: ", error);
            throw error;
        }
    }


    async getAlbergue(id) {
        try {
            return await db.query('CALL pa_SelectAlbergue(?);', [id])
        } catch (error) {
            console.error("Error en getAmenaza: ", error);
            throw error;
        }
    }

    async deleteAlbergue(id) {
        try {
            return await db.query('CALL pa_DeleteAlbergue(?);', [id]);
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
        const { idAlbergue,
            nombre,
            region,
            coordenadaX,
            coordenadaY,
            idUbicacion,
            tipo_establecimiento,
            tipo_albergue,
            condicion_albergue,
            especificacion,
            detalle_condicion,
            administrador,
            telefono,
            idCapacidad,
            seccion,
            requerimientos_tecnicos,
            costo_requerimientos_tecnicos,
            idInfraestructura,
            idMunicipalidad,
            color,
            idPedidoAbarrote,
            idUsuarioCreacion,
            idUsuarioModificacion, } = Albergue;
        try {
            return await db.query('CALL pa_InsertAlbergue(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
                [
                    idAlbergue,
                    nombre,
                    region,
                    coordenadaX,
                    coordenadaY,
                    idUbicacion,
                    tipo_establecimiento,
                    tipo_albergue,
                    condicion_albergue,
                    especificacion,
                    detalle_condicion,
                    administrador,
                    telefono,
                    idCapacidad,
                    seccion,
                    requerimientos_tecnicos,
                    costo_requerimientos_tecnicos,
                    idInfraestructura,
                    idMunicipalidad,
                    color,
                    idPedidoAbarrote,
                    idUsuarioCreacion,
                    idUsuarioModificacion,
                ]);
        }
        catch (error) {
            console.error("Error en postAlbergue: ", error);
            throw error;
        }
    }

    async getForIdAlbergue(id) {
        try {
            return await db.query('CALL pa_ConsultarAlberguePorId(?);', [id])
        } catch (error) {
            console.error("Error al encontrar el albergue: ", error);
            throw error;
        }
    }

    async getForNombreAlbergue(nombre) {
        try {
            return await db.query('CALL pa_ConsultarAlberguePorNombre(?);', [nombre])
        } catch (error) {
            console.error("Error al encontrar el albergue: ", error);
            throw error;
        }
    }

    async getForDistritoAlbergue(distrito) {
        try {
            return await db.query('CALL pa_ConsultarAlberguePorDistrito(?);', [distrito])
        } catch (error) {
            console.error("Error al encontrar el albergue por distrito: ", error);
            throw error;
        }
    }

    async getForCantonAlbergue(canton) {
        try {
            return await db.query('CALL pa_ConsultarAlberguePorCanton(?);', [canton])
        } catch (error) {
            console.error("Error al encontrar el albergue por canton: ", error);
            throw error;
        }
    }

    async getForProvinciaAlbergue(provincia) {
        try {
            return await db.query('CALL pa_ConsultarAlberguePorProvincia(?);', [provincia])
        } catch (error) {
            console.error("Error al encontrar el albergue por provincia: ", error);
            throw error;
        }
    }

    async getResumenAlberguesColor(Color){
        try{
           return await db.query('CALL pa_ResumenAlberguesColor(?);', [Color])
        } catch (error) {
            console.error("Error al encontrar el albergue por color: ", error);
            throw error; 
        }
    }

}

    


module.exports = new albergueModel();



