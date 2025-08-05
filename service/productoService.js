const productoModel = require('../models/productoModel');

const confirmarObligatorios = (objeto, obligatorios) => {
    if (typeof objeto !== 'object' || objeto == null || !Array.isArray(obligatorios)) throw new Error("No se pero si esto pasó algo esta muy mal.");
    for (const campo of obligatorios) {
        if (!objeto[campo]) {
            handleError("postProducto", new Error(`Falta el campo obligatorio '${campo}'`), 400);
        }
    }
}

const handleError = (lugar, error, status = null) => {
    if (status) error.flagStatus = status;
    console.error("Error en productoService. " + lugar + ": ", error.message);
    throw error;
}

class productoService {

    async getAllProducto() {
        try {
            const result = await productoModel.getAllProducto();
            return result;
        } catch (error) {
            console.error("Error en productoService.getAllProducto: ", error);
            throw error;
        }
    }

    async getProducto(id) {
        if (!id) {
            throw new Error('ID de producto es requerido');
        }
        try {
            const result = await productoModel.getProducto(id);
            if (!result || !result[0] || result[0].length === 0) {
                throw new Error('Producto no encontrado');
            }
            return result;
        } catch (error) {
            console.error("Error en productoService.getProducto: ", error);
            throw error;
        }
    }

    async postProducto(producto) {
        confirmarObligatorios(producto, ["codigoProducto", "nombre", "cantidad"]);
        try {
            const result = await productoModel.postProducto(producto);
            return result;
        } catch (error) {
            console.error("Error en productoService.postProducto: ", error);
            throw error;
        }
    }

    async deleteProducto(id) {
        if (!id) {
            throw new Error('ID de producto es requerido');
        }
        try {
            const result = await productoModel.deleteProducto(id);
            return result;
        } catch (error) {
            console.error("Error en productoService.deleteProducto: ", error);
            throw error;
        }
    }
}
module.exports = new productoService();