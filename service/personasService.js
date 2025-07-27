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

const confirmarObligatorios = (objeto, indice, obligatorios) => {
    if (typeof objeto !== 'object' || objeto == null || !Array.isArray(obligatorios)) throw new Error("No se pero si esto pasó algo esta muy mal.");
    for (const campo of obligatorios) {
        if (!objeto[campo]) {
            handleError("postPersonas", new Error(`Falta el campo obligatorio '${campo}' en la persona #${indice}`), 400);
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
    
    async postPersonas(personas = null) {
    if (!personas) {
        handleError("postPersonas", new Error("El array de personas no puede ser nulo."), 400);
    }
    if (!Array.isArray(personas)) {
        handleError("postPersonas", new Error("Se esperaba un array de personas."), 400);
    }
    if (personas.length === 0) {
        handleError("postPersonas", new Error("El array de personas no puede estar vacío."), 400);
    }

    const resultados = [];
    const errores = [];

    const postPersona = async (persona, indice) => {
        const camposObligatorios = [
            'tieneCondicionSalud', 'discapacidad', 'firma', 'idFamilia',
            'nombre', 'primerApellido', 'segundoApellido',
            'tipoIdentificacion', 'numeroIdentificacion', 'nacionalidad',
            'parentesco', 'esJefeFamilia', 'fechaNacimiento',
            'genero', 'sexo', 'telefono', 'estaACargoMenor', 'idUsuarioCreacion'
        ];

        confirmarObligatorios(persona, indice, camposObligatorios);
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
            await postPersona(persona, i);
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
}

module.exports = new PersonasService();