const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const basedatos = require('../MySQL/basedatos.js');

const login = async (req, res) => {
    try {
        console.log('🔐 Iniciando proceso de login...');
        
        // 1. Validar que req.body existe
        if (!req.body) {
            console.log('❌ No se recibieron datos en el body');
            return res.status(400).json({ 
                success: false,
                error: 'No se recibieron datos' 
            });
        }

        const { correo, contraseña } = req.body;

        // 2. Validar campos requeridos
        if (!correo || !contraseña) {
            console.log('❌ Campos faltantes en el login');
            return res.status(400).json({ 
                success: false,
                error: 'Correo y contraseña son requeridos' 
            });
        }

        // 3. Verificar que la base de datos esté disponible
        const isHealthy = await basedatos.isHealthy();
        if (!isHealthy) {
            console.log('❌ Base de datos no disponible');
            return res.status(500).json({ 
                success: false,
                error: 'Servicio de base de datos no disponible' 
            });
        }

        console.log(`🔍 Buscando usuario: ${correo}`);

        // 4. Buscar usuario en la base de datos
        const query = `
            SELECT id, correo, contraseña, rol, idMunicipalidad, activo 
            FROM usuarios 
            WHERE correo = ? AND activo = 1
        `;
        
        const usuarios = await basedatos.query(query, [correo]);

        if (!usuarios || usuarios.length === 0) {
            console.log('❌ Usuario no encontrado o inactivo');
            return res.status(401).json({ 
                success: false,
                error: 'Credenciales inválidas' 
            });
        }

        const usuario = usuarios[0];

        // 5. Verificar contraseña
        console.log('🔐 Verificando contraseña...');
        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!contraseñaValida) {
            console.log('❌ Contraseña incorrecta');
            return res.status(401).json({ 
                success: false,
                error: 'Credenciales inválidas' 
            });
        }

        // 6. Generar JWT
        console.log('🎫 Generando token JWT...');
        const payload = {
            id: usuario.id,
            correo: usuario.correo,
            rol: usuario.rol,
            idMunicipalidad: usuario.idMunicipalidad
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, { 
            expiresIn: '24h' 
        });

        // 7. Respuesta exitosa
        console.log('✅ Login exitoso');
        res.json({
            success: true,
            message: 'Login exitoso',
            token,
            usuario: {
                id: usuario.id,
                correo: usuario.correo,
                rol: usuario.rol,
                idMunicipalidad: usuario.idMunicipalidad
            }
        });

    } catch (error) {
        console.error('❌ Error en el login:', error);
        
        // Manejar diferentes tipos de errores
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ 
                success: false,
                error: 'Error de conexión a la base de datos' 
            });
        }

        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor' 
        });
    }
};

// Otros métodos del controlador...
const register = async (req, res) => {
    try {
        // Lógica de registro similar con las mismas validaciones
        console.log('📝 Iniciando proceso de registro...');
        
        // Validaciones similares...
        
    } catch (error) {
        console.error('❌ Error en el registro:', error);
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor' 
        });
    }
};

module.exports = {
    login,
    register
};