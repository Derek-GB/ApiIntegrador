const referenciaModel = require('../models/referenciaModel.js');

class referenciaService {

    async getAllReferencia() {
        try {
            const result = await referenciaModel.getAllReferencia();
            return result;
        } catch (error) {
            console.error("Error en referenciaService.getAllReferencia: ", error);
            throw error;
        }
    }

    async getReferencia(referencia) {
        if (!referencia.id) {
            throw new Error('ID de referencia es requerido');
        }
        try {
            const result = await referenciaModel.getReferencia(referencia);
            if (!result || !result[0] || result[0].length === 0) {
                throw new Error('Referencia no encontrada');
            }
            return result;
        } catch (error) {
            console.error("Error en referenciaService.getReferencia: ", error);
            throw error;
        }
    }

    async postReferencia(referencia) {
        if (!referencia.idFamilia || !referencia.tipoAyuda || !referencia.fechaEntrega) {
            throw new Error('Faltan datos obligatorios: idFamilia, tipoAyuda, fechaEntrega');
        }
        try {
            const result = await referenciaModel.postReferencia(referencia);
            return result;
        } catch (error) {
            console.error("Error en referenciaService.postReferencia: ", error);
            throw error;
        }
    }

    async deleteReferencia(referencia) {
        if (!referencia.id) {
            throw new Error('ID de referencia es requerido');
        }
        try {
            const result = await referenciaModel.deleteReferencia(referencia);
            if (result[0].affectedRows === 0) {
                throw new Error('Referencia no encontrada o ya fue eliminada');
            }
            return result;
        } catch (error) {
            console.error("Error en referenciaService.deleteReferencia: ", error);
            throw error;
        }
    }
}
module.exports = new referenciaService();