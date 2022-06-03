var express = require("express");
var router = express.Router();
const fetchData = require("../modules/data/fetch.js");
/* GET home page. */
router.get("/", async function (req, res, next) {
  await fetchData();

  res.render("index", { title: "Express" });
});

module.exports = router;
