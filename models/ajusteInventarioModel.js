//Cambios Emerson
const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class ajusteInventarioModel {
    async getAjuste(Inventario){
        const  { id } = Inventario
        try {
            return await db.query('CALL pa_SelectAjusteInventario(?)', [id])
        }catch(error){
            console.error("Error en getAjuste: ", error);
            throw error;
        }
    }

    async postAjuste(Inventario) {
        const { idProducto, justificacion, cantidadOriginal, cantidadAjustada, idUsuarioCreacion } = Inventario
        try {
            const rerult = await db.query('CALL pa_InsertAjusteInventario(?, ?, ?, ?, ?)', 
                [ idProducto, justificacion, cantidadOriginal, cantidadAjustada, idUsuarioCreacion ])
        } catch (error) {
            console.error("Error en postAjuste: ", error);
            throw error;
        }
    }

    async getAllAjuste(){
        try {
            return await db.query('CALL pa_SelectAllAjusteInventario')
        }catch(error){
            console.error("Error en getAjuste: ", error);
            throw error;
        }
    }


}
module.exports = new ajusteInventarioModel();