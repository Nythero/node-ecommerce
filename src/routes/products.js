const express = require('express');
const router = express.Router();

//Middlewares
const bodyParser = require('body-parser');
const authorization = require('../middlewares/authorization.js');

const insert = require('../models/products.js');

router.get('/:id', (req, res) => {});

router.get('/', (req, res) => {
  res.status(200);
  res.send();
});

router.post('/', authorization('client', 403), bodyParser.urlencoded({ extended : false }), async (req, res) => {
  if (!isValid(req.body.product) || !isValid(req.body.price, /^[0-9]*([.,][0-9]{2,2})?$/)) {
    res.status(400).send();
  }
  else {
    insert(req.body.product, req.body.price, res.locals.user['Username']);
    res.status(201).send();
  }
});

module.exports = router;
