const mysql = require('mysql2/promise');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.DATABASE
});


module.exports = pool;
