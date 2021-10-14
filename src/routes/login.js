const express = require('express');
const router = express.Router();

//Middlewares
const authentificationParser = require('../middlewares/authentificationParser.js');
const authentification = require('../middlewares/authentification.js');
const redirectToIndex = require('../middlewares/redirectToIndex.js');

//Controller
const sessions = require('../controllers/sessions.js');

router.get('/', redirectToIndex, (req, res) => {
  res.status(200).sendFile('./public/login.html', {root : './src/'});
});

router.post('/', authentificationParser, authentification, sessions.insert);

module.exports = router;
