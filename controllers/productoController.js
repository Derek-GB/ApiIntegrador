const { request, response } = require('express');
const productoService = require("../service/productoService");

const { pool } = require('../MySQL/basedatos')

const getAllProducto = async (req = request, res = response) => {
    try {
        const data = await productoService.getAllProducto();
        res.json({
            success: true,
            data: data[0],
            message: "Producto obtenida exitosamente",
        });
    } catch (error) {
        console.error('Error en getAllMethod:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al obtener productos'
        });
    }
};

const getProducto = async (req = request, res = response) => {
    const { id } = req.body;
    try {
        const data = await productoService.getProducto(id);
        res.json({
            success: true,
            data: data[0][0]
        });
    } catch (error) {
        console.error('Error en getMethod:', error);
        if (error.message === 'ID de producto es requerido') {
            return res.status(400).json({
                success: false,
                message: "ID de producto no proporcionado",
            });
        }
        if (error.message === 'Producto no encontrado') {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
            });
        }
        return res.status(500).json({
            success: false,
            error: 'Error al obtener productos'
        });
    }
};

const postProducto = async (req, res) => {
    let {
        codigoProducto,
        nombre,
        descripcion = null,
        cantidad,
        categoria = null,
        unidadMedida = null
    } = req.body;

    try {
        const data = await productoService.postProducto({ codigoProducto, nombre, descripcion, cantidad, categoria, unidadMedida });
        res.json({
            success: true,
            message: 'Producto insertado correctamente',
            data: {
                id: data[0][0].id,
                codigoProducto,
                nombre,
                descripcion,
                cantidad,
                categoria,
                unidadMedida
            }
        });
    } catch (error) {
        console.error("Error en postMethodTwo:", error);
        if (error.message.includes('Faltan datos obligatorios')) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: "Error al insertar producto",
            error: error.message, // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
        });
    }
}

const putProducto = (req = request, res = response) => {
    const { id, descripcion, cantidad } = req.body;


    if (typeof id !== 'number' || typeof descripcion !== 'string' || typeof cantidad !== 'number') {
        return res.status(400).json({
            success: false,
            message: 'Datos inválidos o faltantes: se requieren id (number), descripcion (string) y cantidad (number)'
        });
    }

    pool.query('CALL pa_UpdateProducto(?, ?, ?)', [id, descripcion, cantidad], (error, results) => {
        if (error) {
            console.error('Error al actualizar producto:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al actualizar producto'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producto actualizado correctamente',
            data: {
                id,
                descripcion,
                cantidad
            }
        });
    });
}

const deleteProducto = async (req = request, res = response) => {
    const { id } = req.body;
    try {
        const data = await productoService.deleteProducto(id);
        res.json({
            success: true,
            message: `Producto con ID ${id} eliminado correctamente`
        });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID de producto no proporcionado en el body'
        });
    }
    return res.status(500).json({
                success: false,
                error: 'Error al eliminar producto'
            });
    }
};


module.exports = {
    getAllProducto,
    getProducto,
    postProducto,
    putProducto,
    deleteProducto
}