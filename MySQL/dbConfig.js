const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

let instance = null;

class DbService {
    constructor() {
        this._pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT) || 3306,
            connectionLimit: Number(process.env.DB_POOL_LIMIT) || 20,
            queueLimit: 0,
            acquireTimeout: 10000,
        }).promise();
    }

    static getDbServiceInstance() {
        if (!instance) instance = new DbService();
        return instance;
    }

    get pool() {
        return this._pool;
    }

    async test() {
        await this._pool.query('SELECT 1');
    }

    async query(sql, params = []) {
        try {
            const [rows] = await this._pool.query(sql, params);
            return rows;
        } catch (err) {
            console.error('Error en la consulta:', err);
            throw err;
        }
    }

    async withTransaction(workFn) {
        const conn = await this._pool.getConnection();
        try {
            await conn.beginTransaction();
            const result = await workFn(conn);
            await conn.commit();
            return result;
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    }

    async close() {
        await this._pool.end();
    }
}

module.exports = DbService;