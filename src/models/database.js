async function init() {
  //Create Tables
  await require('./userTypes.js').create();
  await require('./user.js').create();
  await require('./sessions.js').create();
  await require('./productCategories.js').create();
  await require('./products.js').create();
  await require('./carts.js').create();

  //Set initial values
  await require('./userTypes.js').init();
  await require('./user.js').init();
}

module.exports.init = init;
