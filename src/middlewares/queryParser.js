const queryParser = (req, res, next) => {
  if (req.query.query) {
    res.locals.queryStrings = req.query.query.split(' ');
  }
  next();
};

module.exports = queryParser;
