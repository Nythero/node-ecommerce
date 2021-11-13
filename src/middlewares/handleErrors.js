const handleErrors = (err, req, res, next) => {
  console.error(err);
  res.status(500).send();
};

module.exports = handleErrors;
