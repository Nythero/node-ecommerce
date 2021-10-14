const products = require('../models/products.js');

const getSite = (req, res) => {
  res.status(200);
  res.send();
};

const insert = async (req, res, next) => {
  try {
    await products.insert(req.body.product, req.body.price, res.locals.user['Username'], req.body.category);
    res.status(201).send();
  }
  catch (err) {
    next(err);
  }
};

module.exports = {
  insert: insert,
  getSite: getSite
};
