const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class usuarioModel {
    async getAllUsuarios() {
        try {
            return await db.query('CALL pa_SelectAllUsuario();')
        } catch (error) {
            console.error("Error en getAllUsuario: ", error);
            throw error;
        }
    }

    async getUsuario(id) {
        try {
            return await db.query('CALL pa_SelectUsuario(?);', [id])
        } catch (error) {
            console.error("Error en getUsuario: ", error);
            throw error;
        }
    }


    async postUsuario(usuario) {
        const { cedula, nombre, apellido1, apellido2, correo, contrasenaHash, telefono, idRol } = usuario;
        try {
            return await db.query('CALL pa_InsertUsuario(?, ?, ?, ?, ?, ?, ?, ?);', 
                [cedula, nombre, apellido1, apellido2, correo, contrasenaHash, telefono, idRol]);
        }
        catch (error) {
            console.error("Error en postUsuario: ", error);
            throw error;
        }
    }


    async deleteUsuario(id) {
        try {
            return await db.query('CALL pa_DeleteUsuario(?);', [id]);
        } catch (error) {
            console.error("Error en deleteMethod: ", error);
            throw error;
        }

    }

    async validarCorreoMethod(usuario) {
        const { correo } = usuario;
        try {
            const result = await db.query('CALL pa_ValidarCorreo(?);', [correo]);
            return result;
        } catch (error) {
            console.error("Error en validarCorreoMethod: ", error);
            throw error;
        }
    }

    async putConstrasenaMethod(usuario) {
        const { id, contrasenaHash } = usuario;
        try {
            const result = await db.query('CALL pa_UpdateUsuarioContrasena(?, ?);', [id, contrasenaHash]);
            return result;
        } catch (error) {
            console.error("Error en putContrasenaMethod: ", error);
            throw error;
        }
    }




}







module.exports = new usuarioModel();