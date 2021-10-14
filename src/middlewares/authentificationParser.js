const auth = require('basic-auth');

function authentificationParser (req, res, next) {
  res.locals.credentials = auth.parse(req.get('Authorization'));
  if (!res.locals.credentials) {
    res.status(400).send();
  }
  else {
    next();
  }
}

module.exports = authentificationParser;
