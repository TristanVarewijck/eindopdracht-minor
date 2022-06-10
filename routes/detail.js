var express = require("express");
var router = express.Router();
const axios = require("axios").default;
require("dotenv").config();
const dataParser = require("../modules/dataCleaning.js");
/* GET detail page. */
router.get("/boek/:id", async function (req, res, next) {
  const { id } = req.params;
  await axios({
    method: "GET",
    url: `${process.env.DATA_ID}${id}&authorization=${process.env.DATA_AUTH}&refine=true&output=json`,
  })
    .then((res) => dataParser(res.data.results))
    .then((cleanData) => {
      res.render("detail", { item: cleanData });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
