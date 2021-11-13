const sessions = require('../models/sessions.js');

const insert = async (req, res) => {
  res.cookie('sid', await sessions.insert(res.locals.credentials.name));
  res.status(200).send();
}

const remove = async (req, res) => {
  if (req.cookies.sid) {
    await sessions.deleteS(req.cookies.sid);
    res.clearCookie('sid');
    res.status(204).send();
  }
  else {
    res.status(401).send();
  }
};

module.exports = {
  insert: insert,
  remove: remove
};
