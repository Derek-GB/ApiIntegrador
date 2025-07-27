const personasModel = require('../models/personasModel');

const handleError = (lugar, error, status = null) => {
    if (status) error.flagStatus = status;
    console.error("Error en PersonasService. " + lugar + ": ", error.message);
    throw error;
}

const confirmarOpcionales = (objeto, opcionales) => {
    if (typeof objeto !== 'object' || objeto == null || !Array.isArray(opcionales)) throw new Error("No se pero si esto pasó algo esta muy mal.");
    for (const campo of opcionales) {
        if (objeto[campo] === undefined) {
            objeto[campo] = null;
        }
    }
}

class PersonasService {

    async getAllPersonas() {
        try {
            const results = await personasModel.getAllPersonas();
            return results;
        } catch (error) {
            handleError("getAllPersonas", error);
        }
    }

    async getPersona(id = null) {
        if (id === null) {
            handleError("getFamilia", new Error("El ID de la persona no puede ser nulo."), 400);
        }
        try {
            const result = await personasModel.getPersona(id);
            return result;
        } catch (error) {
            handleError("getPersona", error);
        }
    }
    
    //esto iba en el controller
    async postPersonas(personas) {
        if (!Array.isArray(personas)) {
            handleError("postPersonas", new Error("Se esperaba un array de personas."), 400);
        }
        if (personas.length === 0) {
            handleError("postPersonas", new Error("El array de personas no puede estar vacío."), 400);
        }
        const resultados = [];
        const errores = [];

        const postPersona = async (persona, indice) => {
            if (
                persona.tieneCondicionSalud === undefined ||
                persona.discapacidad === undefined ||
                persona.firma === undefined ||
                persona.idFamilia === undefined ||
                persona.nombre === undefined ||
                persona.primerApellido === undefined ||
                persona.segundoApellido === undefined ||
                persona.tipoIdentificacion === undefined ||
                persona.numeroIdentificacion === undefined ||
                persona.nacionalidad === undefined ||
                persona.parentesco === undefined ||
                persona.esJefeFamilia === undefined ||
                persona.fechaNacimiento === undefined ||
                persona.genero === undefined ||
                persona.sexo === undefined ||
                persona.telefono === undefined ||
                persona.estaACargoMenor === undefined ||
                persona.idUsuarioCreacion === undefined
            ) {
                handleError("postPersonas", new Error("Faltan campos obligatorios en el objeto persona numero: " + indice), 400);
            }
            confirmarOpcionales(persona, ['fechaNacimiento', 'fechaDefuncion']);
            const resultado = await personasModel.postPersona(persona);
            resultados.push({ succcess: true, resultado: resultado, indice });
        }

        for (const persona of personas) {
            try {
                if (typeof persona !== 'object' || persona === null) {
                    handleError("postPersonas", new Error("Cada elemento del array debe ser un objeto persona."), 400);
                }
                await postPersona(persona, resultados.length);
            } catch (error) {
                resultados.push({ success: false, indice });
                errores.push({ indice, error });
            }
        }
        const statusCode =
            errores.length === personas.length
                ? 500
                : errores.length > 0
                    ? 207
                    : 201;
        return res.status(statusCode).json({
            success: errores.length === 0,
            resultados,
            errores,
        });
    }



    async putPersona(id, persona) {
        try {
            confirmarOpcionales(persona, ['fechaNacimiento', 'fechaDefuncion']);
            return await personasModel.putPersona(id, persona);
        } catch (error) {
            handleError("putPersona", error);
        }
    }

    async deletePersona(id) {
        try {
            return await personasModel.deletePersona(id);
        } catch (error) {
            handleError("deletePersona", error);
        }
    }
}