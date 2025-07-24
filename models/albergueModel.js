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
}
module.exports = new albergueModel();