const mysql = require('mysql2/promise');
const timeout = require('util').promisify(setTimeout);

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.DATABASE
});

console.log('Connecting to MySQL database');

const checkConnection = async (attempts = 3, time = 1000) => {
  for(let attempt = 1; attempt <= attempts; attempt++) {
    try {
      console.log(`Checking if MySQL database is ready. Attempt #${attempt}`);
      await pool.query("SHOW DATABASES;");
      console.log('MySQL server is ready');
      break;
    }
    catch (err) {
      console.log(`MySQL database is not ready. \nAttempting again after ${time} ms. \nAttempts remaining ${attempts - attempt}`);
      await timeout(time);
    }
  }
  pool.emit('MySQLServerReady');
};

module.exports.checkConnection = checkConnection;
module.exports.pool = pool;
