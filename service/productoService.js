const productoModel = require('../models/productoModel');

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

    async getProducto(productos) {
        if (!producto.id) {
            throw new Error('ID de producto es requerido');
        }
        try {
            const result = await productoModel.getProducto(producto);
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
        if (!producto.codigoProducto || !producto.nombre || !producto.cantidad) {
            throw new Error('Faltan datos: codigoProducto, nombre, cantidad')
        }
        try {
            const result = await productoModel.postProducto(producto);
            return result;
        } catch (error) {
            console.error("Error en productoService.postProducto: ", error);
            throw error;
        }
    }

    async deleteProducto(producto) {
        if (!producto.id) {
            throw new Error('ID de producto es requerido');
        }
        try {
            const result = await productoModel.deleteProducto(producto);
            if (result[0].affectedRows === 0) {
                throw new Error('Producto no encontrado o ya fue eliminado');
            }
            return result;
        } catch (error) {
            console.error("Error en productoService.deleteProducto: ", error);
            throw error;
        }
    }
}
module.exports = new productoService();