const handleSQLErrors = (err, req, res, next) => {
  console.log(err.errno);
  if(err.errno === 1452) {
    res.status(404).send();
  }
  else if (err.errno === 1062){
    res.status(422).send();
  }
  else {
    next(err);
  }
};

module.exports = handleSQLErrors;
