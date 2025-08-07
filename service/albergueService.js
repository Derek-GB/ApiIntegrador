const albergueModel = require('../models/albergueModel');

class albergueService {

    async getAllAlbergues() {
        try {
            const result = await albergueModel.getAllAlbergues();
            return result;
        } catch (error) {
            console.error("Error en albergueService.getAllAlbergues: ", error);
            throw error;
        }
    }

//      async updateAlbergue(id, albergueData) {
//     try {
//       const result = await albergueModel.updateAlbergue(id, albergueData);
//       return result;
//     } catch (error) {
//       throw new Error('Error en el servicio al actualizar el albergue: ' + error.message);
//     }
//   }


    async postAlbergue(Albergue) {
        const { idAlbergue, nombre, distrito, canton, provincia, direccion, telefono, idPedidoAbarrote, idUsuarioCreacion, idUsuarioModificacion } = albergue;
        if (!idAlbergue || !nombre || !distrito || !canton  || !provincia || !direccion || !telefono || !idPedidoAbarrote || !idUsuarioCreacion || !idUsuarioModificacion) {
            throw new Error('Faltan datos: idAlbergue, nombre, distrito, canton, provincia, direccion, telefono, idPedidoAbarrote, idUsuarioCreacion e idUsuarioModificacion son requeridos');
        }   
        try {
            const result = await albergueModel.postAlbergue(Albergue);
            return result;
        } catch (error) {
            console.error("Error en albergueService.postAlbergue: ", error);
            throw error;
        }
    }

    async getAlbergue(id) {
        try {
            const result = await albergueModel.getAlbergue(id);
            return result;
        } catch (error) {
            console.error("Error en albergueModel.getAlbergue: ", error);
            throw error;
        }
    }


    async deleteAlbergue(id) {
        try {
            const result = await albergueModel.deleteAlbergue(id);
            return result;
        } catch (error) {
            console.error("Error en albergueModel.deleteAlbergue: ", error);
            throw error;
        }

    }

    async getForIdAlbergue(id) {
            try {
                const result = await albergueModel.getForIdAlbergue(id);
                return result;
            } catch (error) {
                console.error("Error en albergueModel.getForIdAlbergue: ", error);
                throw error;
            }
        }
    
    async getForNombreAlbergue(nombre) {
            try {
                const result = await albergueModel.getForNombreAlbergue(nombre);
                return result;
            } catch (error) {
                console.error("Error en albergueModel.getForNombreAlbergue: ", error);
                throw error;
            }
        }
    async getForDistritoAlbergue(distrito) {
            try {
                const result = await albergueModel.getForDistritoAlbergue(distrito);
                return result;
            } catch (error) {
                console.error("Error en albergueModel.getForDistritoAlbergue: ", error);
                throw error;
            }
        }
    async getForCantonAlbergue(canton) {
            try {
                const result = await albergueModel.getForCantonAlbergue(canton);
                return result;
            } catch (error) {
                console.error("Error en albergueModel.getForCantonAlbergue: ", error);
                throw error;
            }
        }
    async getForProvinciaAlbergue(provincia) {
            try {
                const result = await albergueModel.getForProvinciaAlbergue(provincia);
                return result;
            } catch (error) {
                console.error("Error en albergueModel.getForProvinciaAlbergue: ", error);
                throw error;
            }
        }

    async getResumenAlberguesColor(Color){
         try {
            const result = await albergueModel.getResumenAlberguesColor(Color);
            return result;
        } catch (error) {
            console.error("Error en albergueModel.ResumenAlberguesColor: ", error);
            throw error;
        }
    }

    async getAllAlberguesPorUsuario(idUsuario){
         try {
            const result = await albergueModel.getAllAlberguesPorUsuario(idUsuario);
            return result;
        } catch (error) {
            console.error("Error en albergueModel.getAllAlberguesPorUsuario: ", error);
            throw error;
        }
    }
    


}


module.exports = new albergueService();