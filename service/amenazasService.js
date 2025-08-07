const amenazasModel = require('../models/amenazasModel');

class amenazasService {
    async getAllAmenazas() {
        try {
            const result = await amenazasModel.getAllAmenazas();
            return result;
        } catch (error) {
            console.error("Error en amenazasService.getAllAmenazas: ", error);
            throw error;
        }
    }

    async getAmenaza(id) {
        try {
            const result = await amenazasModel.getAmenaza(id);
            return result;
        } catch (error) {
            console.error("Error en amenazasService.getAmenaza: ", error);
            throw error;
        }
    }

    async postAmenaza(Amenaza) {

        if (!Amenaza.familiaEvento || !Amenaza.evento || !Amenaza.peligro || !Amenaza.idUsuarioCreacion || !Amenaza.causa || !Amenaza.categoriaEvento) {
            throw new Error('Faltan datos: familiaEvento, evento, peligro, idUsuarioCreacion, causa o categoriaEvento');
        }
        const result = await amenazasModel.postAmenaza(Amenaza);
        return result;

    }

    async deleteAmenaza(id) {
        try {
            const result = await amenazasModel.deleteAmenaza(id);
            return result;
        } catch (error) {
            console.error("Error en amenazasService.deleteAmenaza: ", error);
            throw error;
        }

    }

    async putAmenaza(Amenaza) {
        try {
            const result = await amenazasModel.putAmenaza(Amenaza);
            return result;
        } catch (error) {
            console.error("Error en amenazasService.putAmenaza: ", error);
            throw error;
        }
    }


}

    
module.exports = new amenazasService();