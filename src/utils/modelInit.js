const modelInit = async (model) => {
  try {
    await model.create();
    if (model.hasOwnProperty('init')) {
      await model.init();
    }
    console.log(`Model ${model.name} created successfully.`);
  }
  catch(err) {
    console.log('Database schema failed to start');
    throw err;
  }
}

module.exports = modelInit;
