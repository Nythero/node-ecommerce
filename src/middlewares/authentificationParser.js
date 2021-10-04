const auth = require('basic-auth');

function authentificationParser (req, res, next) {
  res.locals.credentials = auth.parse(req.get('Authorization'));
  next();
}

module.exports = authentificationParser;
