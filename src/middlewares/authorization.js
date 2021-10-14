const { selectUser } = require('../models/sessions.js');

const authorization = (type, code) => {
  return async (req, res, next) => {
    if(req.cookies.sid) {
      const user = await selectUser(req.cookies.sid);
      console.log(user);
      if(user && user['Type'] === type) {
	res.locals.user = user;
        next();
      }
      else {
	if(code) {
          res.status(code).send();
	}
	else {
          next();
	}
      }
    }
    else{
      if(code) {
        res.status(code).send();
      }
      else {
        next();
      }
    }
  }
};

module.exports = authorization;
