const pool = require('./connection.js');

async function create() {
  try {
    await pool.query(`CREATE TABLE Carts (
      Username CHAR(32) NOT NULL,
      Product_id INT UNSIGNED,
      Quantity INT UNSIGNED,
      PRIMARY KEY (Username, Product_id),
      FOREIGN KEY (Username) REFERENCES Users (Username),
      FOREIGN KEY (Product_id) REFERENCES Products (id)
    );`);
  }
  catch (err) {
    if (err.errno !== 1050) {
      throw err;
    }
  }
}

async function insert(username, product, quantity) {
  await pool.execute('INSERT INTO Carts (Username, Product_id, Quantity) VALUES (?, ?, ?);', [username, product, quantity]);
}

async function select(username) {
  return await pool.execute('SELECT * FROM Carts WHERE Username = ?;', [username]);
}

module.exports = {
  create : create,
  insert : insert,
  select : select
};
