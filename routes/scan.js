var express = require("express");
var scanRouter = express.Router();

/* GET home page. */
scanRouter.get("/", function(req, res, next) {
  res.render();
});

module.exports = scanRouter;
