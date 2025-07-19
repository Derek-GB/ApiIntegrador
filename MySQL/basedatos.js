const {createPool}= require('mysql2/promise');

const pool = createPool ({
    host: 'maglev.proxy.rlwy.net',
    user: 'root',
    password: 'GdiRZmJyIbNEuxwCJDtjzOBqBuQSvmPp',
    port: 44477,
    database: 'railway',
    waitForConnections: true,
    connectionLimit: 10,         // Número máximo de conexiones en el pool
    queueLimit: 0,            // Sin límite de cola de espera
})

module.exports=pool;