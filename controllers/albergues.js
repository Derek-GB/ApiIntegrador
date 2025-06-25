const { request, response } = require('express');
const { pool } = require('../MySQL/basedatos')

const getAllMethod = (req = request, res = response) => {
    pool.query('CALL pa_SelectAllAlbergue', (error, results) => {
        if (error) {
            console.error('Error en getAllMethod:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al obtener los albergues'
            });
        }
        // const Data = results[0].map(albergue => ({
        //     id: albergue.id_VARCHAR,
        //     nombre: albergue.nombre_VARCHAR,
        //     region: albergue.region_VARCHAR,
        //     coordenadaX: albergue.coordenadaX_DECIMAL,
        //     coordenadaY: albergue.coordenadaY_DECIMAL,
        //     estado: albergue.estado_VARCHAR
        // }));
        res.json({
            success: true,
            data: results[0]
        });
    });
};

const getMethod = (req = request, res = response) => {     
    const { id } = req.params;     
    if (!id) {         
        return res.status(400).json({             
            success: false,             
            message: 'ID del albergue es requerido'         
        });     
    }     
    pool.query('CALL pa_SelectAlbergue(?)', [id], (error, results) => {         
        if (error) {             
            console.error('Error en getMethod:', error);             
            return res.status(500).json({                 
                success: false,                 
                error: 'Error al obtener el albergue'             
            });         
        }         
        if (!results || !results[0] || results[0].length === 0) {            
            return res.status(404).json({                 
                success: false,                 
                message: 'Albergue no encontrado'             
            });         
        }         
        const albergue = results[0][0];          
        const Data = {             
            id: albergue.id_VARCHAR,             
            nombre: albergue.nombre_VARCHAR,             
            region: albergue.region_VARCHAR,             
            coordenadaX: albergue.coordenadaX_DECIMAL,             
            coordenadaY: albergue.coordenadaY_DECIMAL,             
            estado: albergue.estado_VARCHAR         
        };          
        res.json({             
            success: true,             
            message: 'Albergue obtenido exitosamente',             
            data: Data         
        });     
    }); 
};


const postMethod = (req = request, res = response) => {
    const {
        idAlbergue,nombre,region,coordenadaX,coordenadaY,idUbicacion,tipo_establecimiento,
            tipo_albergue,condicion_albergue,especificacion,detalle_condicion,administrador,
            telefono,idCapacidad,seccion,requerimientos_tecnicos,costo_requerimientos_tecnicos,
            idInfraestructura,idMunicipalidad,color
    } = req.body;
    if (!idAlbergue || !nombre || !region) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos obligatorios: idAlbergue, nombre, region'
        });
    }
    if (coordenadaX == null || coordenadaY == null) {
        return res.status(400).json({
            success: false,
            message: 'Las coordenadas X e Y son obligatorias'
        });
    }
    if (!idUbicacion || !idCapacidad || !idInfraestructura || !idMunicipalidad) {
        return res.status(400).json({
            success: false,
            message: 'Faltan IDs obligatorios: idUbicacion, idCapacidad, idInfraestructura, idMunicipalidad'
        });
    }

    pool.query(
        'CALL pa_InsertAlbergue(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            idAlbergue,nombre,region,coordenadaX,coordenadaY,idUbicacion,tipo_establecimiento,
            tipo_albergue,condicion_albergue,especificacion,detalle_condicion,administrador,
            telefono,idCapacidad,seccion,requerimientos_tecnicos,costo_requerimientos_tecnicos,
            idInfraestructura,idMunicipalidad,color
        ],
        (error, results) => {
            if (error) {
                console.error('Error al insertar albergue:', error);
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        success: false,
                        message: 'Ya existe un albergue con ese ID'
                    });
                }
                return res.status(500).json({
                    success: false,
                    error: 'Error al insertar albergue',
                    details: error.message
                });
            }
            res.status(201).json({
                success: true,
                message: 'Albergue insertado correctamente',
                data: {
                    idAlbergue,nombre,region,coordenadaX,coordenadaY,idUbicacion,tipo_establecimiento,
                    tipo_albergue,condicion_albergue,especificacion,detalle_condicion,administrador,
                    telefono,idCapacidad,seccion,requerimientos_tecnicos,costo_requerimientos_tecnicos,
                    idInfraestructura,idMunicipalidad,color
                }
            });
        }
    );
};

const putMethod = (req = request, res = response) => {
    const {id} = req.body;
    const {codigoProducto, nombre, descripcion, cantidad } = req.body;

    if (!id || !codigoProducto || nombre == null || descripcion == null || cantidad == null) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos: codigo, nombre, descripcion, cantidad '
        });
    }

    pool.query('CALL pa_UpdateAlbergue(?, ?, ?, ?, ?)', [id, codigoProducto, nombre, descripcion, cantidad], (error, results) => {
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
                codigoProducto,
                nombre,
                descripcion,
                cantidad
            }
        });
    });
};


const deleteMethod = (req = request, res = response) => {
    const { id } = req.params; 

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID de albergue no proporcionado en el body'
        });
    }
    pool.query('CALL pa_DeleteAlbergue(?)', [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar albergue:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al eliminar albergue'
            });
        }

        res.json({
            success: true,
            message: `Albergue con ID ${id} eliminado correctamente`
        });
    });
};


module.exports = {
    getAllMethod,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
}