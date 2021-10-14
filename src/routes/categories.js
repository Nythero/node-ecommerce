const express = require('express');
const router = express.Router();

//Middlewares
const bodyParser = require('body-parser');
const bodyValidation = require('../middlewares/bodyValidation.js');
const authorization = require('../middlewares/authorization.js');

//Controller
const categories = require('../controllers/categories.js');

const parameters = [{name: 'category', regex: /^(\w){1,32}$/}];

router.post('/', authorization('admin', 404), bodyParser.urlencoded({ extended : false }), bodyValidation(parameters), categories.insert);

module.exports = router;
