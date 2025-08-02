const pedidoConsumibleModel = require('../models/pedidoConsumibleModel');

class pedidoConsumibleService {

    async getAllPedidosConsumibles() {
        try {
            const results = await pedidoConsumibleModel.getAllPedidosConsumibles();
            return results;
        } catch (error) {
            console.error("Error en pedidoConsumibleService.getAllPedidosConsumibles: ", error);
            throw error;
        }
    }

    async getPedidoConsumible(id) {
        try {
            const result = await pedidoConsumibleModel.getPedidoConsumible(id);
            return result;
        } catch (error) {
            console.error("Error en pedidoConsumibleService.getPedidoConsumible: ", error);
            throw error;
        }
    }


    async postPedidoConsumible(pedidoConsumible) {
        if (!pedidoConsumible.tipoComida || !pedidoConsumible.cantidadPersonas || !pedidoConsumible.idConsumible || !pedidoConsumible.idAlbergue || !pedidoConsumible.idUsuarioCreacion) {
            throw new Error('Faltan datos: tipoComida, cantidadPersonas, idConsumible, idAlbergue, idUsuarioCreacion');
        }
        try {
            const result = await pedidoConsumibleModel.postPedidoConsumible(pedidoConsumible);
            return result;
        } catch (error) {
            console.error("Error en pedidoConsumibleService.postPedidoConsumible: ", error);
            throw error;
        }
        
    }

    async deletePedidoConsumible(id) {
        try {
            const result = await pedidoConsumibleModel.deletePedidoConsumible(id);
            return result;
        }
        catch (error) {
            console.error("Error en pedidoConsumibleService.deletePedidoConsumible: ", error);
            throw error;
        }
    }

}

    
module.exports = new pedidoConsumibleService();