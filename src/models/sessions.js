const pool = require('./connection.js');
const uuid = require('../utils/uuid.js');

async function create() {
  try {
    await pool.query(`CREATE TABLE Sessions (
      Username CHAR(32) NOT NULL,
      Id CHAR(36) NOT NULL,
      Created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (Id),
      FOREIGN KEY (Username) REFERENCES Users(Username)
    );`);
  }
  catch (err) {
    if (err.errno !== 1050) {
      throw err;
    }
  }
}

async function insert(username) {
  let success = false;
  let id;
  while (!success) {
    try {
      id = uuid();
      await pool.execute(`INSERT INTO Sessions (Username, Id) VALUES (?, ?);`, [username, id]);
      success = true;
    }
    catch (err) {
      if (err.errno !== 1062) {
        throw err;
      }
      else {
        console.error(err);
      }
    }
  }
  return id;
}

async function select(id) {
  const [rows, fields] = await pool.execute('SELECT * FROM Sessions WHERE Id = ?;', [id]);
  return rows;
}

async function selectUser(id) {
  const [rows, fields] = await pool.execute("SELECT Users.* FROM Sessions INNER JOIN Users ON Sessions.Username = Users.Username  WHERE Sessions.Id = ?;", [id]);
  return rows[0];
}

async function deleteS(id) {
  await pool.execute('DELETE FROM Sessions WHERE Id = ?', [id]);
}

module.exports = {
  create : create,
  insert : insert,
  select : select,
  selectUser : selectUser,
  deleteS : deleteS
};
