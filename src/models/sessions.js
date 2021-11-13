const pool = require('./connection.js').pool;
const uuid = require('../utils/uuid.js');

const sessions = {

  async create() {
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
  },
  
  async insert(username) {
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
  },
  
  async select(id) {
    const [rows, fields] = await pool.execute('SELECT * FROM Sessions WHERE Id = ?;', [id]);
    return rows;
  },
  
  async selectUser(id) {
    const [rows, fields] = await pool.execute("SELECT Users.* FROM Sessions INNER JOIN Users ON Sessions.Username = Users.Username  WHERE Sessions.Id = ?;", [id]);
    return rows[0];
  },
  
  async deleteS(id) {
    await pool.execute('DELETE FROM Sessions WHERE Id = ?', [id]);
  }
}

pool.once('MySQLServerReady', () => sessions.create());

module.exports = sessions;
