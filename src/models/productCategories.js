const pool = require('./connection.js').pool;
const modelInit = require('../utils/modelInit.js');

const productCategories = { 
  name: 'Categories',
  async create() {
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
  },
  
  async insert(name, superior = null) {
    await pool.execute('INSERT INTO Categories (Name, Superior_Category) VALUES (?, ?);', [name, superior]);
  },
  
  async select(name) {
    return await pool.execute('SELECT * FROM Categories WHERE Name = ?;', [name]);
  }
}

pool.once('MySQLServerReady', modelInit(productCategories));

module.exports = productCategories;
