const pool = require('./connection.js');

async function create() {
  try {
    await pool.query(`CREATE TABLE Categories (
      Id INT UNSIGNED AUTO_INCREMENT,
      Name CHAR(32) NOT NULL UNIQUE,
      Superior_Category INT UNSIGNED,
      PRIMARY KEY (Id),
      FOREIGN KEY (Superior_Category) REFERENCES Categories (Id)
    );`);
  }
  catch (err) {
    if (err.errno !== 1050) {
      throw err;
    }
  }
}

async function insert(name, superior = null) {
  await pool.execute('INSERT INTO Categories (Name, Superior_Category) VALUES (?, ?);', [name, superior]);
}

async function select(name) {
  return await pool.execute('SELECT * FROM Categories WHERE Name = ?;', [name]);
}

module.exports = {
  create : create,
  insert : insert,
  select : select
};
