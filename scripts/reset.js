require('dotenv').config();
const connection = require("../src/models/connection.js");

const drop = async (table) => {
  await connection.execute(`DROP TABLE IF EXISTS ${table};`);
};

const dropAll = async () => {
  await drop('Carts');
  await drop('Products');
  await drop('Categories');
  await drop('Sessions');
  await drop('Users');
  await drop('Types');
  connection.end();
}

dropAll();
