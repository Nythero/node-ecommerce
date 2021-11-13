const get = (req, res) => {
  res.status(200).sendFile('./public/index.html', {root : './src/'});
};

module.exports = get;
