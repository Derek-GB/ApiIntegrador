const { request, response } = require('express');
const detallePedidoConsumibleService = require('../service/detallePedidoConsumibleService');

const getAllDetallePedidoConsumibles = async (req = request, res = response) => {
    try {
        const data = await detallePedidoConsumibleService.getAllDetallePedidoConsumibles();
        res.status(200).json({
            success: true,
            data: data[0],
        });
    } catch (error) {
        console.error("Error en getAllDetallePedidoConsumibles:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener los detalles de pedidos consumibles",
            error: error.message,
        });
    }
};

const getDetallePedidoConsumible = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const result = await detallePedidoConsumibleService.getDetallePedidoConsumible(id);
        res.json({
            success: true,
            data: result[0][0],
        });
    } catch (error) {
        console.error("Error en getDetallePedidoConsumible:", error);
        if (error.message === 'Detalle no encontrado') {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            error: "Error al obtener el detalle de pedido consumible",
        });
    }
};

const postDetallePedidoConsumible = async (req = request, res = response) => {
    const { idPedido, idConsumible, cantidad } = req.body;
    if (!idPedido || !idConsumible || !cantidad) {
        return res.status(400).json({
            success: false,
            error: "Faltan datos obligatorios: idPedido, idConsumible, cantidad"
        });
    }
    try {
        const data = await detallePedidoConsumibleService.postDetallePedidoConsumible({
            idPedido,
            idConsumible,
            cantidad
        });
        const insertedId = data[0][0]?.id || data[0]?.id || null;
        if (!insertedId) {
            console.error("Estructura del resultado:", JSON.stringify(data, null, 2));
            throw new Error("No se pudo obtener el ID del detalle insertado");
        }
        res.status(201).json({
            success: true,
            message: 'Detalle de pedido consumible insertado correctamente',
            data: {
                id: insertedId,
                idPedido,
                idConsumible,
                cantidad,
            },
        });
    } catch (error) {
        console.error("Error al insertar detalle de pedido consumible:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Error al insertar detalle de pedido consumible",
        });
    }
};

const deleteDetallePedidoConsumible = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        await detallePedidoConsumibleService.deleteDetallePedidoConsumible(id);
        res.json({
            success: true,
            message: `Detalle de pedido consumible con ID ${id} eliminado correctamente`,
        });
    } catch (error) {
        console.error("Error al eliminar detalle de pedido consumible:", error);
        if (error.message === 'Detalle no encontrado') {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            error: "Error al eliminar detalle de pedido consumible",
        });
    }
};

module.exports = {
    getAllDetallePedidoConsumibles,
    getDetallePedidoConsumible,
    postDetallePedidoConsumible,
    deleteDetallePedidoConsumible,
}