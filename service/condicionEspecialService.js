const condicionEspecialModel = require('../models/condicionEspecialModel');

class condicionEspecialService {

    async getAllCondicionesEspeciales() {
        try {
            const result = await condicionEspecialModel.getAllCondicionesEspeciales();
            return result;
        } catch (error) {
            console.error("Error en condicionEspecialService.getAllCondicionesEspeciales: ", error);
            throw error;
        }
    }

    async getCondicionEspecial(id) {
        if (!id) {
            throw new Error('ID de condición especial es requerido');
        }
        try {
            const result = await condicionEspecialModel.getCondicionEspecial(id);
            if (!result || !result[0] || result[0].length === 0
            ) {
                throw new Error('Condición especial no encontrada');
            }
            return result;
        } catch (error) {
            console.error("Error en condicionEspecialService.getCondicionEspecial: ", error);
            throw error;
        }
    }

    async postCondicionEspecial(condicionEspecial) {
        if (!condicionEspecial.idPersona || !condicionEspecial.discapacidad || !condicionEspecial.tipoDiscapacidad || !condicionEspecial.subtipoDiscapacidad || !condicionEspecial.tieneCondicionSalud || !condicionEspecial.condicionSaludId) {
            throw new Error('Faltan datos: idPersona, discapacidad, tipoDiscapacidad, subtipoDiscapacidad, tieneCondicionSalud, condicionSaludId');
        }
        try {
            const result = await condicionEspecialModel.postCondicionEspecial(condicionEspecial);
            return result;
        } catch (error) {
            console.error("Error en condicionEspecialService.postCondicionEspecial: ", error);
            throw error;
        }
    }

    async deleteCondicionEspecial(id) {
        if (!id) {
            throw new Error('ID de condición especial es requerido');
        }
        try {
            const result = await condicionEspecialModel.deleteCondicionEspecial(id);
            if (result[0].affectedRows === 0) {
                throw new Error('Condición especial no encontrada o ya fue eliminada');
            }
            return result;
        } catch (error) {
            console.error("Error en condicionEspecialService.deleteCondicionEspecial: ", error);
            throw error;
        }
    }

    async getResumenCondicionesEspeciales(idCondicionesEspeciales = null) {
        if (!idCondicionesEspeciales) {
            handleError("getResumenCondicionesEspeciales", new Error("Falta el codigo de condiciones especiales"), 400);
        }
        const [rows] = await condicionEspecialModel.getResumenCondicionesEspeciales(idCondicionesEspeciales);
        return rows; // Aquí ya devuelves solo las filas reales
    } catch (error) {
        handleError("getResumenCondicionesEspeciales", error);
    
    }




}
module.exports = new condicionEspecialService();