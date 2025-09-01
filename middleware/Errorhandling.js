const ErrorHandling = (req, res, err, next) => {
  console.error("Error: ", err.message);
  res.status(500).send("Something broke globally");
};
module.exports = {
  ErrorHandling,
};
