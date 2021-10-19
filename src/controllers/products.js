const products = require('../models/products.js');
const productsDto = require('../Dtos/products.js');

const productsController = {
  getWithId: async (req, res, next) => {
    try {
      let product = await products.selectId(req.params.id);
      res.status(200).json(new productsDto(product));
    }
    catch (err) {
      next(err);
    }
  },
  
  getAll: async (req, res, next) => {
    try {
      let product = await products.select(res.locals.queryStrings);
      res.status(200).json(new productsDto(product));
    }
    catch (err) {
      next(err);
    }
  },


  insert: async (req, res, next) => {
    try {
      await products.insert(req.body.product, req.body.price, res.locals.user['Username'], req.body.category);
      res.status(201).send();
    }
    catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      await products.remove(req.params.id);
    }
    catch (err) {
      next(err);
    }
  }
};

module.exports = productsController;
