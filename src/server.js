const express = require('express');
const app = express();
require('dotenv').config();
require('./models/database.js').init();

//Routes
const index = require('./routes/index.js');
const login = require('./routes/login.js');
const logout = require('./routes/logout.js');
const register = require('./routes/register.js');
const products = require('./routes/products.js');
const notFound = require('./routes/notFound.js');
const cart = require('./routes/cart.js');
const categories = require('./routes/categories.js');

//Middleware
const cookieParser = require('cookie-parser');
const handleErrors = require('./middlewares/handleErrors.js');
const handleSqlErrors = require('./middlewares/handleSQLErrors.js');

app.use('/', (req, res, next) => {
  console.log(req.path);
  next();
});
app.use(express.static('src/public'));
app.use(cookieParser());

//Endpoints
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/categories', categories);
app.use('/products', products);
app.use('/cart', cart);
app.use('/', index);
app.use('*', notFound);
app.use(handleSqlErrors);
app.use(handleErrors);

let main = async () => {
  await require('./models/connection.js').checkConnection(process.env.MYSQLATTEMPTS, process.env.MYSQLTIMEOUT);
  app.listen(process.env.PORT, () => console.log(`Server working on http://localhost:${process.env.PORT}`));
}

main();
