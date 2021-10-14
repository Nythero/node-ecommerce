const safeCompare = require('../utils/safeCompare.js');
const { getSecret } = require('../models/user.js');
const { createHash } = require('crypto');

async function authenticate (req, res, next) {
  const secret = await getSecret(res.locals.credentials.name);
  const hash = createHash('sha256');
  hash.update(res.locals.credentials.pass);
  const hashString = hash.digest('hex');
  if(secret && safeCompare(hashString, secret)) {
    next();
  }
  else {
    res.status(422).send();
  } 
}

module.exports = authenticate;
