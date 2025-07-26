const amenazasModel = require('../models/amenazasModel');

class amenazasService {
    async getAllMethod() {
        try {
            const result = await amenazasModel.getAllMethod();
            return result;
        } catch (error) {
            console.error("Error en amenazasService.getAllMethod: ", error);
            throw error;
        }
    }

    async getMethod(id) {
        try {
            const result = await amenazasModel.getMethod(id);
            return result;
        } catch (error) {
            console.error("Error en amenazasService.getMethod: ", error);
            throw error;
        }
    }

    async postMethod(Amenaza) {

        if (!Amenaza.familiaEvento || !Amenaza.evento || !Amenaza.peligro || !Amenaza. causa || !Amenaza.categoriaEvento || !Amenaza. idFamilia || !Amenaza.idUsuarioCreacion) {
            throw new Error('Faltan datos: familiaEvento, evento, peligro, causa, categoriaEvento, idFamilia y idUsuarioCreacion son requeridos');
        }
        const result = await amenazasModel.postMethod(Amenaza);
        return result;

    }

    async deleteMethod(id) {
        try {
            const result = await amenazasModel.deleteMethod(id);
            return result;
        } catch (error) {
            console.error("Error en amenazasService.deleteMethod: ", error);
            throw error;
        }

    }

    async putMethod(Amenaza) {
        try {
            const result = await amenazasModel.putMethod(Amenaza);
            return result;
        } catch (error) {
            console.error("Error en amenazasService.putMethod: ", error);
            throw error;
        }
    }

}

    
module.exports = new amenazasService();