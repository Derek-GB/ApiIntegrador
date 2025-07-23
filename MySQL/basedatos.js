const { createPool } = require('mysql2/promise');
require('dotenv').config();

class DatabaseConnection {
    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }

        this.pool = null;
        this.isConnected = false;
        DatabaseConnection.instance = this;
        
        // Mensaje inicial
        console.log('🔄 Inicializando configuración de base de datos...');
    }

    // Método para inicializar la conexión
    async connect() {
        if (this.isConnected && this.pool) {
            console.log('✅ Usando conexión existente a la base de datos');
            return this.pool;
        }

        console.log('🔄 Estableciendo conexión con la base de datos...');
        console.log(`📍 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
        console.log(`🗄️  Base de datos: ${process.env.DB_DATABASE}`);

        try {
            this.pool = createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                port: parseInt(process.env.DB_PORT) || 3306,
                database: process.env.DB_DATABASE,
                connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
                queueLimit: parseInt(process.env.DB_QUEUE_LIMIT) || 0,
                acquireTimeout: parseInt(process.env.DB_ACQUIRE_TIMEOUT) || 60000,
                timeout: parseInt(process.env.DB_TIMEOUT) || 60000,
                reconnect: true,
                timezone: '+00:00'
            });

            console.log('🔄 Probando conexión con la base de datos...');

            // Verificar la conexión
            const connection = await this.pool.getConnection();
            await connection.ping();
            connection.release();

            this.isConnected = true;
            
            // Mensajes de éxito con detalles
            console.log('✅ ¡CONEXIÓN EXITOSA A LA BASE DE DATOS!');
            console.log('📊 Detalles de la conexión:');
            console.log(`   - Host: ${process.env.DB_HOST}`);
            console.log(`   - Puerto: ${process.env.DB_PORT}`);
            console.log(`   - Base de datos: ${process.env.DB_DATABASE}`);
            console.log(`   - Usuario: ${process.env.DB_USER}`);
            console.log(`   - Límite de conexiones: ${parseInt(process.env.DB_CONNECTION_LIMIT) || 10}`);
            console.log('🚀 La aplicación está lista para realizar consultas');
            
            return this.pool;

        } catch (error) {
            // Mensajes de error detallados
            console.error('❌ ERROR AL CONECTAR CON LA BASE DE DATOS');
            console.error('💥 Detalles del error:');
            console.error(`   - Mensaje: ${error.message}`);
            console.error(`   - Código: ${error.code || 'N/A'}`);
            console.error(`   - Host intentado: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
            console.error('🔧 Verifica tu configuración en el archivo .env');
            
            this.isConnected = false;
            throw error;
        }
    }

    // Método para obtener el pool de conexiones
    async getPool() {
        if (!this.isConnected || !this.pool) {
            console.log('🔄 Pool no disponible, reconectando...');
            return await this.connect();
        }
        return this.pool;
    }

    // Método para ejecutar consultas
    async query(sql, params = []) {
        try {
            console.log('🔍 Ejecutando consulta SQL...');
            const pool = await this.getPool();
            const [results] = await pool.execute(sql, params);
            console.log(`✅ Consulta ejecutada exitosamente (${results.length || 0} resultados)`);
            return results;
        } catch (error) {
            console.error('❌ Error en la consulta SQL:');
            console.error(`   - SQL: ${sql}`);
            console.error(`   - Error: ${error.message}`);
            throw error;
        }
    }

    // Método para ejecutar transacciones
    async transaction(callback) {
        const pool = await this.getPool();
        const connection = await pool.getConnection();
        
        console.log('🔄 Iniciando transacción...');
        
        try {
            await connection.beginTransaction();
            console.log('✅ Transacción iniciada');
            
            const result = await callback(connection);
            
            await connection.commit();
            console.log('✅ Transacción completada y confirmada');
            return result;
        } catch (error) {
            await connection.rollback();
            console.error('❌ Error en la transacción - Rollback realizado');
            console.error(`   - Error: ${error.message}`);
            throw error;
        } finally {
            connection.release();
            console.log('🔄 Conexión de transacción liberada');
        }
    }

    // Método para verificar el estado de la conexión
    async isHealthy() {
        try {
            console.log('🏥 Verificando estado de salud de la base de datos...');
            const pool = await this.getPool();
            const connection = await pool.getConnection();
            await connection.ping();
            connection.release();
            console.log('✅ Base de datos saludable');
            return true;
        } catch (error) {
            console.error('❌ La base de datos no está saludable:');
            console.error(`   - Error: ${error.message}`);
            return false;
        }
    }

    // Método para cerrar todas las conexiones
    async disconnect() {
        if (this.pool) {
            try {
                console.log('🔄 Cerrando conexiones de base de datos...');
                await this.pool.end();
                this.isConnected = false;
                console.log('✅ Todas las conexiones de base de datos cerradas correctamente');
                console.log('👋 Desconexión exitosa');
            } catch (error) {
                console.error('❌ Error al cerrar las conexiones:');
                console.error(`   - Error: ${error.message}`);
            }
        } else {
            console.log('ℹ️  No hay conexiones activas para cerrar');
        }
    }

    // Método estático para obtener la instancia
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
}

// Crear y exportar la instancia única
const dbInstance = DatabaseConnection.getInstance();

// Mensaje final de inicialización
console.log('📦 Singleton de base de datos inicializado');
console.log('⚡ Listo para establecer conexiones');

module.exports = dbInstance;