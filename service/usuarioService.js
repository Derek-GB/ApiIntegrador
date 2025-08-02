const usuarioModel = require('../models/usuarioModel');

class usuarioService {
    async getAllUsuarios() {
        try {
            const result = await usuarioModel.getAllUsuarios();
            return result;
        } catch (error) {
            console.error("Error en usuarioService.getAllUsuarios: ", error);
            throw error;
        }
    }

    async getUsuario(id) {
        try {
            const result = await usuarioModel.getUsuario(id);
            return result;
        } catch (error) {
            console.error("Error en usuarioService.getUsuario: ", error);
            throw error;
        }
    }

    async postUsuario(usuario) {

        if (!usuario.nombreUsuario || !usuario.correo || !usuario.contrasenaHash || !usuario.rol || !usuario.activo || !usuario.idMunicipalidad || !usuario.identificacion) {
            throw new Error('Faltan datos: nombreUsuario, correo, contrasenaHash, rol, activo, idMunicipalidad, identificacion')
        }
        const result = await usuarioModel.postUsuario(usuario);
        return result;

    }

    async deleteUsuario(id) {
        try {
            const result = await usuarioModel.deleteUsuario(id);
            return result;
        } catch (error) {
            console.error("Error en usuarioService.deleteUsuario: ", error);
            throw error;
        }

    }

    async validarCorreoMethod(usuario) {
        try {
            const result = await usuarioModel.validarCorreoMethod(usuario);
            return result;
        } catch (error) {
            console.error("Error en usuarioService.validarCorreoMethod: ", error);
            throw error;
        }
    }

    async putContrasenaMethod(usuario) {
        try {
            const result = await usuarioModel.putConstrasenaMethod(usuario);
            return result;
        } catch (error) {
            console.error("Error en usuarioService.putContrasenaMethod: ", error);
            throw error;
        }
    }

    async loginUsuario(usuario) {
        try {
            const result = await usuarioModel.loginUsuario(usuario);
            return result;
        } catch (error) {
            console.error("Error en usuarioService.loginUsuario: ", error);
            throw error;
        }
    }

}

    
module.exports = new usuarioService();