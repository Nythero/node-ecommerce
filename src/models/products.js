const pool = require('./connection.js');

async function create() {
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
}

async function insert(name, price, seller, category) {
  await pool.execute('INSERT INTO Products (Name, Price, Seller, Category) VALUES (?, ?, ?, ?);', [name, price, seller, category]);
}

async function select(query) {
  if (query) {
    return await pool.execute('SELECT * FROM Products WHERE Name = "%?%";', [query]);
  }
  else {
    return await pool.execute('SELECT * FROM Products;');
  }
}

module.exports = {
  create : create,
  insert : insert,
  select : select
};
