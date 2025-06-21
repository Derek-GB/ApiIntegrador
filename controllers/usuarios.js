const { request, response } = require('express');


const getMethod = (req = request, res = response) => {

    const { nombre, universidad } = req.query;
    res.json({
        OK: "200",
        msj: "Mesaje GET devuelto desde el controlador ",
        nombre,
        universidad: "no enviada"
    });

}

const postMethod = (req = request, res = response) => {

    const body = req.body;


    res.json({
        OK: "200",
        msj: "Mesaje POST desde el controlador",
        body: {
            nombre: "Luis",
            edad: 25
        }
    });

    console.log(body);

}

const putMethod = (req, res = response) => {
    const { id } = req.params;
    const { nombre, universidad } = req.body;

    res.json({
        OK: "200",
        msj: `Usuario con ID ${id} actualizado`,
        datos_actualizados: {
            nombre,
            universidad
        }
    });

}


const deleteMethod = (req, res = response) => {
    res.json({
        OK: "200",
        msj: "Mesaje DELETE devuelto desde el controlador "
    });

}


module.exports = {
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
}