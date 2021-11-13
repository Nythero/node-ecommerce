const pool = require('./connection.js');

const carts = {
  create: async () => {
    try {
      await pool.query(`CREATE TABLE Carts (
        Username CHAR(32) NOT NULL,
        Product_id INT UNSIGNED NOT NULL,
        Quantity INT UNSIGNED NOT NULL,
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
  },

  insert: async (username, product, quantity) => {
    await pool.execute('INSERT INTO Carts (Username, Product_id, Quantity) VALUES (?, ?, ?);', [username, product, quantity]);
  },

  select: async (username) => {
    return await pool.execute('SELECT * FROM Carts WHERE Username = ?;', [username]);
  },

  delete: async (username, product) => {
    await pool.execute('DELETE FROM Carts WHERE Username = ? AND Product_id = ?;', [username, product]);
  },

  exists: async (username, product) => {
    let [rows, fields] = await pool.execute('SELECT * FROM Carts WHERE Username = ? AND Product_id = ?;', [username, product]);

    return rows[0] !== undefined && rows[0] !== null;
  }
};

module.exports = carts;
