//Cambios Emerson
const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class productoModel {
    
    async getAllProducto() {
        try {
            return await db.query('CALL pa_SelectAllProducto();');
        } catch (error) {
            console.error("Error en getAllProducto: ", error);
            throw error;
        }
    }

    async getProducto(producto) {
        const { id } = producto;
        try {
            const result = await db.query('CALL pa_SelectProducto(?);', [id]);
            return result;
        } catch (error) {
            console.error("Error en getProducto: ", error);
            throw error;
        }
    }

    async postMethod(producto) {
        const { codigoProducto, nombre, descripcion, cantidad, categoria, unidadMedida } = producto;
        try {
            return await db.query('CALL pa_InsertProducto(?, ?, ?, ?, ?, ?);', 
                [codigoProducto, nombre, descripcion, cantidad, categoria, unidadMedida]);
        } catch (error) {
            console.error("Error en postMethod: ", error);
            throw error;
        }
    }

    async deleteProducto(producto) {
        const { id } = producto;
        try {
            const result = await db.query('CALL pa_DeleteProducto(?);', [id]);
            return result;
        } catch (error) {
            console.error("Error en deleteProducto: ", error);
            throw error;
        }
    }
 }
module.exports = new productoModel();