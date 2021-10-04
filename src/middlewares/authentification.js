const safeCompare = require('../utils/safeCompare.js');
const { getSecret } = require('../models/user.js');
const crypto = require('crypto');
const { createHash } = require('crypto');
const { insert } = require('../models/sessions.js');

async function authenticate (req, res, next) {
  if (!res.locals.credentials) {
    res.status(400);
    res.sendFile('./public/login.html', {root : './src/'});
    return;
  }
  const secret = await getSecret(res.locals.credentials.name);
  const hash = createHash('sha256');
  hash.update(res.locals.credentials.pass);
  const hashString = hash.digest('hex');
  if(secret && safeCompare(hashString, secret)) {
    res.cookie('sid', await insert(res.locals.credentials.name));
    res.status(200).send();
  }
  else {
    res.status(422);
    res.sendFile('./public/login.html', {root : './src/'});
  } 
}

module.exports = authenticate;
