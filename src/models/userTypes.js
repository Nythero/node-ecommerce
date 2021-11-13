const pool = require('./connection.js');

async function create() {
  try {
    await pool.query(`CREATE TABLE Types (
      Id CHAR(32),
      PRIMARY KEY (Id)
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
    await insert('admin');
    await insert('client');
  }
  catch (err) {
    if (err.errno !== 1062) {
      throw err;
    }
  }
}

async function insert(id) {
  await pool.execute('INSERT INTO Types (Id) VALUES (?);', [id]);
}

async function select(id) {
  return await pool.execute('SELECT * FROM Type WHERE Id = ?', [id]);
}

module.exports = {
  create : create,
  select : select,
  init : init
};
