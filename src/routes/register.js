const express = require('express');
const router = express.Router();

//Middlewares
const bodyParser = require('body-parser');
const bodyValidation = require('../middlewares/bodyValidation.js');
const redirectToIndex = require('../middlewares/redirectToIndex.js');

//Controller
const user = require('../controllers/user.js');

router.get('/', redirectToIndex, (req, res) => {
  res.status(200).sendFile('./public/register.html', {root : './src/'});
});

const parameters = [{name: 'username', regex: /^[\w-\.]{1,32}$/}, {name: 'secret', regex: /^[A-Za-z0-9#?!@$ %^&*-]{8,32}$/}];

router.post('/', bodyParser.urlencoded({ extended : false }), bodyValidation(parameters), user.register);

module.exports = router;
