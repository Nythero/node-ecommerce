const pool = require('./connection.js');

async function create() {
  try {
    await pool.query(`CREATE TABLE Users (
      Username CHAR(32) UNIQUE NOT NULL,
      Password CHAR(64) NOT NULL,
      Type CHAR(32) NOT NULL,
      PRIMARY KEY (Username),
      FOREIGN KEY (Type) REFERENCES Types(Id)
    );`);
  }
  catch (err) {
    if (err.errno !== 1050) {
      throw err;
    }
  }
}

async function init() {
  try {
    await insert('admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'admin');
  }
  catch (err) {
    if (err.errno !== 1062) {
      throw err;
    }
  }
}

async function insert(username, secret, type = "client") {
  await pool.execute('INSERT INTO Users (Username, Password, Type) VALUES (?, ?, ?);', [username, secret, type]);
}

async function getSecret(username) {
  const [rows, fields] = await pool.execute('SELECT Password FROM Users WHERE username = ?;', [username]);
  return (rows[0])? rows[0]['Password'] : undefined;
}

module.exports = {
  create : create,
  init : init,
  insert : insert,
  getSecret : getSecret
};
