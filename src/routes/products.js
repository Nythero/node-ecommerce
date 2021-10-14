const express = require('express');
const router = express.Router();

//Middlewares
const bodyParser = require('body-parser');
const bodyValidation = require('../middlewares/bodyValidation.js');
const authorization = require('../middlewares/authorization.js');

//Controller
const products = require('../controllers/products.js');

router.get('/:id', (req, res) => {});

router.get('/', products.getSite);

const parameters = [{name: 'product', regex: /^[\w ]*$/}, {name: 'price', regex: /^[0-9]*([.,][0-9]{2,2})?$/}];

router.post('/', authorization('client', 403), bodyParser.urlencoded({ extended : false }), bodyValidation(parameters), products.insert);

module.exports = router;
