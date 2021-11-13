const categories = require('../models/productCategories.js');

const insert = async (req, res, next) => {
  try {
    await categories.insert(req.body.category);
    res.status(201).send();
  }
  catch (err) {
    next(err);
  }
};

module.exports = {
  insert: insert,
}
