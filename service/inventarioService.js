const inventarioModel = require('../models/inventarioModel.js');

class inventarioService {
    async getAllInventario() {
        try {
            const result = await inventarioModel.getAllInventario();
            return result;
        } catch (error) {
            console.error("Error en inventarioService.getAllInventario: ", error);
            throw error;
        }
    }

    async getInventario(inventario) {
        if (!inventario.id) {
            throw new Error('ID de inventario es requerido');
        }
        try {
            const result = await inventarioModel.getInventario(inventario);
            if (!result || !result[0] || result[0].length === 0) {
                throw new Error('Registro de inventario no encontrado');
            }
            return result;
        } catch (error) {
            console.error("Error en inventarioService.getInventario: ", error);
            throw error;
        }
    }

    async postInventario(inventario) {
        if (!inventario.idAlbergue || !inventario.fecha || !inventario.articulo || 
            !inventario.cantidad || !inventario.estado || !inventario.comentario) {
            throw new Error('Faltan datos obligatorios: idAlbergue, fecha, articulo, cantidad, estado, comentario');
        }
        try {
            const result = await inventarioModel.postInventario(inventario);
            return result;
        } catch (error) {
            console.error("Error en inventarioService.postInventario: ", error);
            throw error;
        }
    }

    async deleteInventario(inventario) {
        if (!inventario.id) {
            throw new Error('ID de inventario es requerido');
        }
        try {
            const result = await inventarioModel.deleteInventario(inventario);
            if (result[0].affectedRows === 0) {
                throw new Error('Registro de inventario no encontrado o ya fue eliminado');
            }
            return result;
        } catch (error) {
            console.error("Error en inventarioService.deleteInventario: ", error);
            throw error;
        }
    }
}
module.exports = new inventarioService();