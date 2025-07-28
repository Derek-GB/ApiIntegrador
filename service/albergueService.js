const albergueModel = require('../models/albergueModel');

class albergueService {

    async getAllAlbergues() {
        try {
            const result = await albergueModel.getAllAlbergues();
            return result;
        } catch (error) {
            console.error("Error en albergueService.getAllAlbergues: ", error);
            throw error;
        }
    }


    async getAlbergue(id) {
        try {
            const result = await albergueService.getAlbergue(id);
            return result;
        } catch (error) {
            console.error("Error en albergueService.getAlbergue: ", error);
            throw error;
        }
    }


    async deleteMethod(id) {
        try {
            const result = await albergueService.deleteAlbergue(id);
            return result;
        } catch (error) {
            console.error("Error en albergueService.deleteAlbergue: ", error);
            throw error;
        }

    }

    async getForIdMethod(id) {
            try {
                const result = await albergueService.getForIdMethod(id);
                return result;
            } catch (error) {
                console.error("Error en albergueService.getForIdMethod: ", error);
                throw error;
            }
        }
    
    async getForNombreMethod(nombre) {
            try {
                const result = await albergueService.getForNombreMethod(nombre);
                return result;
            } catch (error) {
                console.error("Error en albergueService.getForNombreMethod: ", error);
                throw error;
            }
        }
    async getForDistritoMethod(distrito) {
            try {
                const result = await albergueService.getForDistritoMethod(distrito);
                return result;
            } catch (error) {
                console.error("Error en albergueService.getForDistritoMethod: ", error);
                throw error;
            }
        }
    async getForCantonMethod(canton) {
            try {
                const result = await albergueService.getForCantonMethod(canton);
                return result;
            } catch (error) {
                console.error("Error en albergueService.getForCantonMethod: ", error);
                throw error;
            }
        }
    async getForProvinciaMethod(provincia) {
            try {
                const result = await albergueService.getForProvinciaMethod(provincia);
                return result;
            } catch (error) {
                console.error("Error en albergueService.getForProvinciaMethod: ", error);
                throw error;
            }
        }
    


}


module.exports = new albergueService();