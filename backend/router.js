const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

router.get("/teste", (req, res) => {
  res.send({ response: "Test endpoint working." }).status(200);
});

module.exports = router;