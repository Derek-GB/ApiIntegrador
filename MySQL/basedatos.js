const {createPool}= require('mysql2/promise');

const pool = createPool ({
    host: 'centerbeam.proxy.rlwy.net',
    user: 'root',
    password: 'seWZxRulWWycWTkgYGrzsXfaGtzItvwT',
    port: 54185,
    database: 'railway',
})

module.exports=pool;