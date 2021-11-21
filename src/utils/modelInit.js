const modelInit = (model) => {
  return async () => { 
    try {
      await model.create();
      if (model.hasOwnProperty('init')) {
        await model.init();
      }
    }
    catch(err) {
      console.log('Database schema failed to start');
      console.error(err);
      process.exit(1);
    }
  };
}

module.exports = modelInit;
