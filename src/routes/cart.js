const express = require('express');
const router = express.Router();

//Middlewares
const bodyParser = require('body-parser');
const bodyValidation = require('../middlewares/bodyValidation.js');
const authorization = require('../middlewares/authorization.js');

//Controller
const carts = require('../controllers/carts.js');

const numberRegex = /^[0-9]*$/;
const bodyValidationParameters = [{name: 'product_id', regex: numberRegex}, {name: 'quantity', regex: numberRegex}];

router.post('/', authorization('client'), bodyParser.urlencoded({ extended : false }), bodyValidation(bodyValidationParameters), carts.insert);

router.get('/', carts.getSite);

router.delete('/', authorization('client', 403), bodyParser.urlencoded({ extended : false }), bodyValidation([bodyValidationParameters[0]]), carts.delete);

module.exports = router;
