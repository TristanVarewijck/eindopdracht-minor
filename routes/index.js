var express = require("express");
var router = express.Router();
const axios = require("axios").default;
require("dotenv").config();
const dataParser = require("../modules/dataCleaning.js");
/* GET home page. */
router.get("/", async function (req, res, next) {
  await axios({
    method: "GET",
    url: `${process.env.DATA_ENDPOINT}boek&authorization=${process.env.DATA_AUTH}&refine=true&output=json`,
  })
    .then((res) => dataParser(res.data.results))
    .then((cleanData) => {
      console.log(cleanData.length);
      res.render("index", {
        cleanData: cleanData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
