const checkAuth = (req, res, next) => {
  const isLoggedIn = true; //change to true to allow
  if (isLoggedIn) {
    next();
  } else {
    res.status(401).send("unauthorized Please Login First ");
  }
};

module.exports = {
  checkAuth,
};
