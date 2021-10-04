const express = require('express');
const router = express.Router();
const { createHash } = require('crypto');
const isValid = require('../utils/isValid.js');

//Middlewares
const bodyParser = require('body-parser');
const redirectToIndex = require('../middlewares/redirectToIndex.js');

const { insert } = require('../models/user.js');

router.get('/', redirectToIndex, (req, res) => {
  res.status(200).sendFile('./public/register.html', {root : './src/'});
});

router.post('/', bodyParser.urlencoded({ extended : false }), async (req, res) => {
  if(!isValid(req.body.username, /^[\w-\.]{1,32}$/) || !isValid(req.body.secret, /^[A-Za-z0-9#?!@$ %^&*-]{8,32}$/)) {
    res.status(400).sendFile('./public/register.html', {root : './src/'});
    return;
  }
  const hash = createHash('sha256');
  hash.update(req.body.secret);
  const secret = hash.digest('hex');
  try {
    await insert(req.body.username, secret);
    res.status(201).send();
  }
  catch (err) {
    if (err.errno === 1062) {
      res.status(422).sendFile('./public/register.html', {root : './src/'});
    }
    else {
      throw err;
    }
  }
});

module.exports = router;
