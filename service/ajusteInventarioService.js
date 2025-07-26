const ajusteInventarioModel = require('../models/ajusteInventarioModel');

class ajusteInventarioService {

    async getMethod(Inventario) {

        if (!Inventario.IdInventario) {
            throw new Error('Faltan datos: id')
        }
        const result = await ajusteInventarioModel.getMethod(Inventario);
        return result;

    }

     async postMethod(Inventario) {
        if (!Inventario.idProducto || !Inventario.justificacion || !Inventario.cantidadOriginal || !Inventario.cantidadAjustada || !Inventario.idUsuarioCreacion  ) {
            throw new Error('Faltan datos: idProducto, justificacion, cantidadOriginal, cantidadAjustada, idUsuarioCreacion')
        }
        const result = await ajusteInventarioModel.postMethod(Inventario);
        return result;
    }   

   async getAllMethod() {
        try {
            const result = await ajusteInventarioModel.getAllMethod();
            return result;
        } catch (error) {
            console.error("Error en ajusteInventarioService.getAllMethod: ", error);
            throw error;
        }
    }

}
module.exports = new ajusteInventarioService();