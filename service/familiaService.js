const familiaModel = require("../models/familiaModel");

const handleError = (lugar, error, status = null) => {
    if (status) error.flagStatus = status;
    console.error("Error en FamiliaService." + lugar + ": ", error.message);
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

class familiaService {

    async getAllFamilias() {
        try {
            const results = await familiaModel.getAllFamilias();
            return results;
        } catch (error) {
            handleError("getAllFamilias", error);
        }
    }

    async getFamilia(id = null ) {
        if (!id) {
            handleError("getFamilia", new Error("Faltan datos requeridos"), 400);
        }
        try {
            const result = await familiaModel.getFamilia(id);
            return result;
        } catch (error) {
            handleError("getFamilia", error);
        }
    }

    async postFamilia(familia) {
        if (
            !familia.provincia ||
            !familia.canton ||
            !familia.distrito ||
            !familia.codigoFamilia ||
            familia.cantidadPersonas === undefined ||
            familia.idAlbergue === undefined ||
            familia.idAmenaza === undefined
        ) {
            handleError("postFamilia", new Error("Faltan datos requeridos"), 400);
        }
        confirmarOpcionales(familia, ["idPersona", "idUsuarioCreacion", "direccion"]);
        try {
            const result = await familiaModel.postFamilia(familia);
            return result;
        } catch (error) {
            handleError("postFamilia", error);
        }
    }

    //algun dia put estara aqui

    async deleteFamilia(id = null) {
        if (!id) {
            handleError("deleteFamilia", new Error("Falta el id"), 400);
        }
        try {
            const result = await familiaModel.deleteFamilia(id);
            return result;
        } catch (error) {
            handleError("deleteFamilia", error);
        }
    }

    async getVistaFamiliaJefe(id = null){
        if (!id) {
            handleError("getVistaFamiliaJefe", new Error("Falta el id"), 400);
        }
        try {
            const result = await familiaModel.getVistaFamiliaJefe(id);
            return result;
        } catch (error) {
            handleError("getVistaFamiliaJefe",error)
        }
    }

    async getForCedulaJefe(cedula = null){
        if (!cedula) {
            handleError("getForCedulaJefe", new Error("Falta la cedula"), 400);
        }
        try {
            const result = await familiaModel.getForCedulaJefe(cedula);
            return result;
        } catch (error) {
            handleError("getForCedulaJefe",error)
        }
    }

    async generarIdentificador(canton = null) {
        if (!canton) {
            handleError("generarIdentificador", new Error("Falta el canton"), 400);
        }
        try {
            const data = await familiaModel.getAllForCanton(canton);
            const cantidadFamilias = data[0].length;
            const nuevoNumero = cantidadFamilias + 1;
            const identificador = `${canton}${String(nuevoNumero).padStart(3, '0')}`;
            return identificador;
        } catch (error) {
            handleError("generarIdentificador", error);
        }
    }
}
module.exports = new familiaService();