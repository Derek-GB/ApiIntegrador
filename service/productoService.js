const productoModel = require('../models/productoModel');

class productoService {

    async postMethod(producto) {

        if (!producto.codigoProducto || !producto.nombre || !producto.cantidad) {
            throw new Error('Faltan datos: codigoProducto, nombre, cantidad')
        }
        const result = await productoModel.postMethod(producto);
        return result;

    }
}
module.exports = new productoService();