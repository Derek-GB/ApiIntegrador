const albergueModel = require('../models/albergueModel');

class AlbergueService {

    async getAllAlbergues() {
        try {
            const result = await albergueModel.getAllAlbergues();
            return result;
        } catch (error) {
            console.error("Error en AlbergueService.getAllAlbergues: ", error);
            throw error;
        }
    }
}
module.exports = new AlbergueService();