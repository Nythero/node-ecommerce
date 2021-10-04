const express = require('express');
const router = express.Router();
const carts = require('../models/carts.js');
const sessions = require('../models/sessions.js');

//Middlewares
const bodyParser = require('body-parser');

router.post('/', bodyParser.urlencoded({ extended : false }), (req, res) => {
  if (req.cookies.sid) {
    //Insertar en carts el username del cookie sid, el id del producto del body y quantity del body
    insert(sessions.select(req.cookies.sid), req.body.product_id, req.body.quantity);
  }
  else {

  }
});

router.get('/', (req, res) => {
  res.status(200);
  res.send();
});

module.exports = router;
