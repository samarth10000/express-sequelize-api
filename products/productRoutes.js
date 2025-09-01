const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get all the products");
});

module.exports = router;
