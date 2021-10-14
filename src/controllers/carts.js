const carts = require('../models/carts.js');

const insert = async (req, res) => {
  if (res.locals.user) {
    //Insertar en carts el username del cookie sid, el id del producto del body y quantity del body
    try {
      await carts.insert(res.locals.user['Username'], req.body.product_id, req.body.quantity);
      res.status(201).send();
    }
    catch (err) {
      if(err.errno === 1452) {
        res.status(404).send();
      }
      else if (err.errno === 1062){
        res.status(422).send();
      }
      else {
        throw err;
      }
    }
  }
  else {
    res.status(403).send();
  }
};

const getSite = (req, res) => {
  res.status(200);
  res.send();
};

module.exports = {
  insert : insert,
  getSite: getSite
};
