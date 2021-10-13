const express = require('express');
const router = express.Router();

const isValid = require('../utils/isValid.js');

//Middlewares
const bodyParser = require('body-parser');
const authorization = require('../middlewares/authorization.js');

const { insert } = require('../models/products.js');

router.get('/:id', (req, res) => {});

router.get('/', (req, res) => {
  res.status(200);
  res.send();
});

router.post('/', authorization('client', 403), bodyParser.urlencoded({ extended : false }), async (req, res) => {
  console.log(typeof req.body.category);
  if (!isValid(req.body.product, /^[\w ]*$/) || !isValid(req.body.price, /^[0-9]*([.,][0-9]{2,2})?$/)) {
    res.status(400).send();
  }
  else {
    try {
      await insert(req.body.product, req.body.price, res.locals.user['Username'], req.body.category);
      res.status(201).send();
    }
    catch (err) {
      console.log(err.errno === 1452);
      if(err.errno === 1452) {
        res.status(404).send();
      }
      else if (err.erno === 1062){
        res.status(422).send();
      }
      else {
        throw err;
      }
    }
  }
});

module.exports = router;
