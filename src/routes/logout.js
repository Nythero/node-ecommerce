const express = require('express');
const router = express.Router();

//Controller
const sessions = require('../controllers/sessions.js');

router.post('/', sessions.remove);

module.exports = router;
