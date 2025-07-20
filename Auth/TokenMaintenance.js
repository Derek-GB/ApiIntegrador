// TokenMaintenance.js
const cron = require('node-cron');
const AuthController = require('../Auth/auth.controller');

class TokenMaintenance {
    // Ejecutar limpieza automática cada 24 horas
    static startCleanupSchedule() {
        // Ejecutar todos los días a las 2:00 AM
        cron.schedule('0 2 * * *', () => {
            console.log('Iniciando limpieza automática de refresh tokens expirados...');
            
            AuthController.cleanupExpiredTokens((error, results) => {
                if (error) {
                    console.error('Error en la limpieza automática de refresh tokens:', error);
                } else {
                    console.log('Limpieza de refresh tokens completada exitosamente');
                }
            });
        });

        console.log('Programación de limpieza de refresh tokens iniciada (todos los días a las 2:00 AM)');
    }

    // Ejecutar limpieza manual
    static manualCleanup(callback) {
        console.log('Iniciando limpieza manual de refresh tokens...');
        
        AuthController.cleanupExpiredTokens((error, results) => {
            if (error) {
                console.error('Error en la limpieza manual de refresh tokens:', error);
                return callback(error, false);
            }
            
            console.log('Limpieza manual completada exitosamente');
            callback(null, true);
        });
    }

    // Iniciar limpieza automática usando setInterval (alternativa a cron)
    static startSimpleCleanupSchedule() {
        // Iniciar inmediatamente la programación usando la función del AuthController
        AuthController.scheduleTokenCleanup();
        console.log('Programación simple de limpieza iniciada (cada 24 horas)');
    }
}

module.exports = TokenMaintenance;