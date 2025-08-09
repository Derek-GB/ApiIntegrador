const municipalidadModel = require('../models/municipalidadModel');

class municipalidadService {

    async getAllMunicipalidades() {
        try {
            const result = await municipalidadModel.getAllMunicipalidades();
            return result;
        } catch (error) {
            console.error("Error en municipalidadService.getAllMunicipalidades: ", error);
            throw error;
        }
    }

    // async getAllMunicipalidades() {
    //     try {
    //         const results = await municipalidadModel.getAllMunicipalidades();
    //         return results;
    //     } catch (error) {
    //         handleError("getAllMunicipalidades", error);
    //     }
    // }


    async getMunicipalidad(id) {
        if (!id) {
            throw new Error('ID de municipalidad es requerido');
        }
        try {
            const result = await municipalidadModel.getMunicipalidad(id);
            if (!result || !result[0] || result[0].length === 0) {
                throw new Error('Municipalidad no encontrada');
            }
            return result;
        } catch (error) {
            console.error("Error en municipalidadService.getMunicipalidad: ", error);
            throw error;
        }
    }

    async postMunicipalidad(municipalidad) {
        if (!municipalidad.nombre || !municipalidad.idUbicacion || !municipalidad.telefono || !municipalidad.correo || !municipalidad.idAlbergue || !municipalidad.idUsuarioCreacion) {
            throw new Error('Faltan datos: nombre, idUbicacion, telefono, correo, idAlbergue o idUsuarioCreacion son requeridos');
        }
        try {
            const result = await municipalidadModel.postMunicipalidad(municipalidad);
            return result;
        } catch (error) {
            console.error("Error en municipalidadModel.postMunicipalidad : ", error);
            throw error;
        }
    }

    async deleteMunicipalidad(id) {
        if (!id) {
            throw new Error('ID de municipalidad es requerido');
        }
        try {
            const result = await municipalidadModel.deleteMunicipalidad(id);
            return result;
        } catch (error) {
            console.error("Error en municipalidadService.deleteMunicipalidad: ", error);
            throw error;
        }
    }



}


module.exports = new municipalidadService();