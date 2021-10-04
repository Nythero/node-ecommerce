const express = require('express');
const router = express.Router();

const { deleteS } = require('../models/sessions.js');

router.post('/', async (req, res) => {
  if (req.cookies.sid) {
    await deleteS(req.cookies.sid);
    res.clearCookie('sid');
    res.status(204).send();
  }
  else {
    res.status(401).send();
  }
});

module.exports = router;
