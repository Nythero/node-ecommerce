const express = require('express');
const router = express.Router();

//Middlewares
const bodyParser = require('body-parser');
const bodyValidation = require('../middlewares/bodyValidation.js');
const authorization = require('../middlewares/authorization.js');
const queryParser = require('../middlewares/queryParser.js');

//Controller
const products = require('../controllers/products.js');

router.get('/:id', products.getWithId);

router.get('/', queryParser, products.getAll);

const parameters = [{name: 'product', regex: /^[\w ]*$/}, {name: 'price', regex: /^[0-9]*([.,][0-9]{2,2})?$/}];

router.post('/', authorization('client', 403), bodyParser.urlencoded({ extended : false }), bodyValidation(parameters), products.insert);

router.delete('/:id', authorization('admin'), authorization('client', 403), products.remove);

module.exports = router;
