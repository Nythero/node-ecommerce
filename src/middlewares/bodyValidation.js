const isValid = require('../utils/isValid.js');

const bodyValidation = (parameters) => {
  return (req, res, next) => {
    for(let i = 0; i < parameters.length; i++) {
      if (!isValid(req.body[parameters[i].name], parameters[i].regex)) {
        return res.status(400).send();
      }
    }
    next();
  };
};

module.exports = bodyValidation;
