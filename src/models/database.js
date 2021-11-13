function init() {
  //Create Tables
  require('./userTypes.js');
  require('./user.js');
  require('./sessions.js');
  require('./productCategories.js');
  require('./products.js');
  require('./carts.js');
}

module.exports.init = init;
