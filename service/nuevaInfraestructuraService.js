const nuevaInfraestructuraModel = require('../models/nuevaInfraestructuraModel');

class nuevaInfraestructuraService {

    async getAllNuevaInfraestructura() {
        try {
            const result = await nuevaInfraestructuraModel.getAllNuevaInfraestructura();
            return result;
        } catch (error) {
            console.error("Error en nuevaInfraestructuraService.getAllNuevaInfraestructura: ", error);
            throw error;
        }
    }

    async getNuevaInfraestructura(nuevaInfraestructura) {
        if (!nuevaInfraestructura.id) {
            throw new Error('ID de la nueva infraestructura es requerido');
        }
        try {
            const result = await nuevaInfraestructuraModel.getNuevaInfraestructura(nuevaInfraestructura);
            if (!result || !result[0] || result[0].length === 0) {
                throw new Error('Nueva infraestructura no encontrada');
            }
            return result;
        } catch (error) {
            console.error("Error en nuevaInfraestructuraService.getNuevaInfraestructura: ", error);
            throw error;
        }
    }

    async postNuevaInfraestructura(nuevaInfraestructura) {
        if (!nuevaInfraestructura.idAlbergue  || !nuevaInfraestructura.fecha  || !nuevaInfraestructura.cantidad || 
            !nuevaInfraestructura.tipo   || !nuevaInfraestructura.descripcion  || !nuevaInfraestructura.costoTotal) {
            throw new Error('Faltan datos obligatorios: idAlbergue, fecha, motivo, tipo, descripcion, costoTotal')
        }
        try {
            const result = await nuevaInfraestructuraModel.postNuevaInfraestructura(nuevaInfraestructura);
            return result;
        } catch (error) {
            console.error("Error en nuevaInfraestructuraService.postNuevaInfraestructura: ", error);
            throw error;
        }
    }

    async deleteNuevaInfraestructura(nuevaInfraestructura) {
        if (!nuevaInfraestructura.id) {
            throw new Error('ID de nueva infraestructura es requerido');
        }
        try {
            const result = await nuevaInfraestructuraModel.deleteNuevaInfraestructura(nuevaInfraestructura);
            if (result[0].affectedRows === 0) {
                throw new Error('Nueva infraestructura no encontrado o ya fue eliminado');
            }
            return result;
        } catch (error) {
            console.error("Error en nuevaInfraestructuraService.deleteNuevaInfraestructura: ", error);
            throw error;
        }
    }
}
module.exports = new nuevaInfraestructuraService();