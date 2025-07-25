//Cambios Emerson
const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class productoModel {
    
    async postMethod(producto) {
        const { codigoProducto, nombre, descripcion, cantidad, categoria, unidadMedida } = producto
        try {
            const rerult = await db.query('CALL pa_InsertProducto(?, ?, ?, ?, ?, ?);', 
                [codigoProducto, nombre, descripcion, cantidad, categoria, unidadMedida])
        } catch (error) {
            console.error("Error en postMethod: ", error);
            throw error;
        }
    }
}
module.exports = new productoModel();