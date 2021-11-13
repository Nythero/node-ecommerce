function isValid(string, regExp = /.*/) {
  return string && regExp.test(string);
}

module.exports = isValid;
