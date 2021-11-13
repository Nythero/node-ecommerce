const { createHash } = require('crypto');
const isValid = require('../utils/isValid.js');
const user = require('../models/user.js');

const register = async (req, res, next) => {
  const hash = createHash('sha256');
  hash.update(req.body.secret);
  const secret = hash.digest('hex');
  try {
    await user.insert(req.body.username, secret);
    res.status(201).send();
  }
  catch (err) {
    next(err);
  }
};

module.exports = {
  register : register
}
