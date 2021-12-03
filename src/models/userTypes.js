const pool = require('./connection.js').pool;
const modelInit = require('../utils/modelInit.js');

const userTypes = {
  name: 'Types',
  async create() {
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
  },

  async init (){
    try {
      await this.insert('admin');
      await this.insert('client');
    }
    catch (err) {
      if (err.errno !== 1062) {
        throw err;
      }
    }
  },

  async insert(id){
    await pool.execute('INSERT INTO Types (Id) VALUES (?);', [id]);
  },

  async select(id){
    return await pool.execute('SELECT * FROM Type WHERE Id = ?', [id]);
  }
}

module.exports = userTypes;
