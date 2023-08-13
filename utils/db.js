import mysql from 'mysql2/promise';

const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'olshop',
});

export default dbPool