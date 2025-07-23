const Servidor = require('./index'); // Ajusta la ruta según tu estructura

// Función principal asíncrona
async function iniciarAplicacion() {
    try {
        console.log('🚀 Iniciando aplicación...');
        
        const servidor = new Servidor();
        
        // Inicializar el servidor (que ahora incluye la inicialización de BD)
        await servidor.listen();
        
        console.log('✅ Aplicación iniciada correctamente');
        
    } catch (error) {
        console.error('❌ Error crítico al iniciar la aplicación:', error.message);
        process.exit(1);
    }
}

// Manejo de cierre graceful
process.on('SIGINT', async () => {
    console.log('\n🔄 Cerrando aplicación...');
    try {
        const basedatos = require('./MySQL/basedatos.js');
        await basedatos.disconnect();
        console.log('👋 Aplicación cerrada correctamente');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al cerrar:', error.message);
        process.exit(1);
    }
});

// Iniciar la aplicación
iniciarAplicacion();