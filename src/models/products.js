const pool = require('./connection.js').pool;
const mysql = require('mysql2');
const modelInit = require('../utils/modelInit.js');

const Query = require('../utils/query.js');

const products = {
  async create() {
    try {
      await pool.query(`CREATE TABLE Products (
        Id INT UNSIGNED AUTO_INCREMENT,
        Name CHAR(32) NOT NULL,
        Price INT UNSIGNED,
        Seller CHAR(32) NOT NULL,
        Category INT UNSIGNED NOT NULL,
        PRIMARY KEY (Id),
        FOREIGN KEY (Seller) REFERENCES Users (Username),
        FOREIGN KEY (Category) REFERENCES Categories (Id)
      );`);
    }
    catch (err) {
      if (err.errno !== 1050) {
        throw err;
      }
    }
  },

  async insert(name, price, seller, category) {
    await pool.execute('INSERT INTO Products (Name, Price, Seller, Category) VALUES (?, ?, ?, ?);', [name, price, seller, category]);
  },

  async select(query) {
    if (query) {
      let queries = new Query(query, ['Products.Name', 'Categories.Name']);
      let sql = mysql.format('SELECT Products.* FROM Products INNER JOIN Categories ON Products.Category = Categories.Id WHERE?;', queries);
      console.log(sql);
      return await pool.execute(sql);
    }
    else {
      return await pool.execute('SELECT * FROM Products;');
    }
  },

  async selectId(Id) {
    return await pool.execute('SELECT * FROM Products WHERE Id = ?', [Id]);
  },

  async remove(id) {
    await pool.execute('DELETE * FROM Products WHERE Id = ?', [id]);
  }

};

pool.once('MySQLServerReady', modelInit(products));

module.exports = products;
