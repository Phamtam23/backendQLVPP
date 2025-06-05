const mysql = require('mysql2/promise');
const { post } = require('./api');

const config = {
    host: 'localhost',
    port:'3306',
    user: 'root',           // thay đổi theo thông tin MySQL
    password:'',
    database: 'ldthanh',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const poolPromise = mysql.createPool(config);

poolPromise.getConnection()
    .then(conn => {
        console.log('Connected to the MySQL database.');
        conn.release(); // trả kết nối lại pool
    })
    .catch(err => {
        console.error('MySQL connection error:', err);
        process.exit(1);
    });

module.exports = {
    poolPromise
};
