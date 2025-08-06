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

    async getProducto(id) {
        try {
            const result = await db.query('CALL pa_SelectProducto(?);', [id]);
            return result;
        } catch (error) {
            console.error("Error en getProducto: ", error);
            throw error;
        }
    }

    async postProducto(producto) {
        const { codigoProducto, nombre, descripcion, cantidad, categoria, unidadMedida } = producto;
        try {
            return await db.query('CALL pa_InsertProducto(?, ?, ?, ?, ?, ?);', 
                [codigoProducto, nombre, descripcion, cantidad, categoria, unidadMedida]);
        } catch (error) {
            console.error("Error en postMethod: ", error);
            throw error;
        }
    }

    async deleteProducto(id) {
        try {
            const result = await db.query('CALL pa_DeleteProducto(?);', [id]);
            return result;
        } catch (error) {
            console.error("Error en deleteProducto: ", error);
            throw error;
        }
    }

    async getForProductoFamilia(productoFamilia) {
        try {
            return await db.query('ConsultarProductosPorFamilia(?);', [productoFamilia])
        } catch (error) {
            console.error("Error al encontrar el producto por familia: ", error);
            throw error;
        }
    }
 }
module.exports = new productoModel();