const express = require('express');
const router = express.Router();

//Middlewares
const bodyParser = require('body-parser');

const { insert } = require('../models/productCategories.js');
const { selectUser } = require('../models/sessions.js');
const authorization = require('../middlewares/authorization.js');

router.post('/', authorization('admin', 404), bodyParser.urlencoded({ extended : false }), async (req, res) => {
  try {
    await insert(req.body.category);
    res.status(201).send();
  }
  catch (err) {
    if (err.errno === 1062) {
      res.status(422).send();
    }
    else {
      throw err;
    }
  }
});

module.exports = router;
