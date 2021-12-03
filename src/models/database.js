async function init() {
  const modelInit = require('../utils/modelInit.js');
  //Create Tables
  await modelInit(require('./userTypes.js'));
  await modelInit(require('./user.js'));
  await modelInit(require('./sessions.js'));
  await modelInit(require('./productCategories.js'));
  await modelInit(require('./products.js'));
  await modelInit(require('./carts.js'));
}

module.exports.init = init;
