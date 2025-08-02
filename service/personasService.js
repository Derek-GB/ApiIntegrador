const personasModel = require('../models/personasModel');

const handleError = (lugar, error, status = null) => {
    if (status) error.flagStatus = status;
    console.error("Error en PersonasService. " + lugar + ": ", error.message);
    throw error;
}

const confirmarOpcionales = (objeto, opcionales) => {
    if (typeof objeto !== 'object' || objeto == null || !Array.isArray(opcionales)) throw new Error("No se pero si esto pasó algo esta muy mal.");
    const nulleados = [];
    for (const campo of opcionales) {
        if (objeto[campo] === undefined) {
            objeto[campo] = null;
            nulleados.push(campo);
        }
    }
    if (nulleados) console.warn(`Los siguientes campos fueron nulleados porque no estaban definidos: ${nulleados.join(', ')}`);
}

const confirmarObligatorios = (objeto, indice, obligatorios) => {
    if (typeof objeto !== 'object' || objeto == null || !Array.isArray(obligatorios)) throw new Error("No se pero si esto pasó algo esta muy mal.");
    for (const campo of obligatorios) {
        if (!objeto[campo]) {
            handleError("postPersonas", new Error(`Falta el campo obligatorio '${campo}'` + (indice ? ` en la persona #${indice}` : "")), 400);
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
    
    async postPersonas(personas = null, firma = null) {
    if (!personas) {
        handleError("postPersonas", new Error("El array de personas no puede ser nulo."), 400);
    }
    if (!Array.isArray(personas)) {
        handleError("postPersonas", new Error("Se esperaba un array de personas."), 400);
    }
    if (personas.length === 0) {
        handleError("postPersonas", new Error("El array de personas no puede estar vacío."), 400);
    }
    if (!firma || typeof firma !== 'object') {
        handleError("postPersonas", new Error("La firma debe ser un objeto con los campos 'ruta', 'nombre' y 'numeroIdentificacion'."), 400);
    }

    const resultados = [];
    const errores = [];

    const postPersona = async (persona, indice, firma = null) => {
        const camposObligatorios = [
            'tieneCondicionSalud', 'discapacidad', 'idFamilia',
            'nombre', 'primerApellido', 'segundoApellido',
            'tipoIdentificacion', 'numeroIdentificacion', 'nacionalidad',
            'parentesco', 'esJefeFamilia', 'fechaNacimiento',
            'genero', 'sexo', 'telefono', 'estaACargoMenor', 'idUsuarioCreacion'
        ];
        if (persona.firma) {
            persona.firma = null;
            console.warn("Alguien intentó usar mal firma");
        }
        confirmarObligatorios(persona, indice, camposObligatorios);
        if (firma) {
            const camposfirma = ['ruta', 'nombre', 'numeroIdentificacion'];
            confirmarObligatorios(firma, null, camposfirma);
            persona.firma = firma.ruta + '/' + firma.nombre;
        }
        confirmarOpcionales(persona, ['fechaNacimiento', 'fechaDefuncion']);
        const resultado = await personasModel.postPersona(persona);
        resultados.push({ success: true, resultado, indice });
    };

    for (let i = 0; i < personas.length; i++) {
        const persona = personas[i];
        try {
            if (typeof persona !== 'object' || persona === null) {
                handleError("postPersonas", new Error("Cada elemento debe ser un objeto persona."), 400);
            }
            if (firma.exists && firma.numeroIdentificacion === persona.numeroIdentificacion) {
                await postPersona(persona, i, firma);
                firma = {exists: false};
            } else {
                await postPersona(persona, i);
            }
        } catch (error) {
            resultados.push({ success: false, indice: i });
            errores.push({ indice: i, error: error.message });
        }
    }

    return { resultados, errores };
}

    //alguna vez habrá un put

    async deletePersona(id) {
        try {
            return await personasModel.deletePersona(id);
        } catch (error) {
            handleError("deletePersona", error);
        }
    }

    async getResumenPersonasDinamico(id = null) {
        if (id === null) {
            handleError("getResumenPersonasDinamico", new Error("El ID de la persona no puede ser nulo."), 400);
        }
        try {
            const result = await personasModel.getResumenPersonasDinamico(id);
            return result;
        } catch (error) {
            handleError("getResumenPersonasDinamico", error);
        }
    }

    async getResumenDiscapacidad(id = null) {
        if (id === null) {
            handleError("getFamilia", new Error("El ID de la persona no puede ser nulo."), 400);
        }
        try {
            const result = await personasModel.getResumenDiscapacidad(id);
            return result;
        } catch (error) {
            handleError("getPersona", error);
        }
    }
}

module.exports = new PersonasService();