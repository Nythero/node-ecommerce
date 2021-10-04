const { select } = require('../models/sessions.js');

const redirectToIndex = async (req, res, next) => {
  if (req.cookies.sid && await select(req.cookies.sid) !== []) {
    res.status(302);
    res.append('Location', '/');
    res.send();
  }
  else {
    console.log("Else");
    next();
  }
};

module.exports = redirectToIndex;
