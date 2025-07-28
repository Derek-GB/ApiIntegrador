//Cambios Emerson
const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class albergueModel {
    async getAllAlbergues(){
        try {
            return await db.query('CALL pa_SelectAllAlbergue();')
        }catch(error){
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

    async getForIdMethod(id) {
        try {
            return await db.query('CALL pa_ConsultarAlberguePorId(?);', [id])
        } catch (error) {
            console.error("Error al encontrar el albergue: ", error);
            throw error;
        }
    }

    async  getForNombreMethod(nombre) {
        try {
            return await db.query('CALL pa_ConsultarAlberguePorNombre(?);', [nombre])
        } catch (error) {
            console.error("Error al encontrar el albergue: ", error);
            throw error;
        }
    }

    async getForDistritoMethod(distrito) {
        try {
            return await db.query('CALL pa_ConsultarAlberguePorDistrito(?);', [distrito])
        } catch (error) {
            console.error("Error al encontrar el albergue por distrito: ", error);
            throw error;
        }
    }

    async getForCantonMethod(canton) {
        try {
            return await db.query('CALL pa_ConsultarAlberguePorCanton(?);', [canton])
        } catch (error) {
            console.error("Error al encontrar el albergue por canton: ", error);
            throw error;
        }
    }

    async getForProvinciaMethod(provincia) {
        try {
            return await db.query('CALL pa_ConsultarAlberguePorProvincia(?);', [provincia])
        } catch (error) {
            console.error("Error al encontrar el albergue por provincia: ", error);
            throw error;
        }
    }
    
}


module.exports = new albergueModel();



