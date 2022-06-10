var express = require("express");
var router = express.Router();
const axios = require("axios").default;
require("dotenv").config();
const dataParser = require("../modules/dataCleaning.js");

// category requests
let winter = `${process.env.DATA_Q}%20winter&authorization=${process.env.DATA_AUTH}&page=1&refine=true&output=json`;
let spannend = `${process.env.DATA_Q}%20spannend&authorization=${process.env.DATA_AUTH}&page=1&refine=true&output=json`;
let monsters = `${process.env.DATA_Q}%20monsters&authorization=${process.env.DATA_AUTH}&page=1&refine=true&output=json`;
let grappig = `${process.env.DATA_Q}%20grappig&authorization=${process.env.DATA_AUTH}&page=1&refine=true&output=json`;
let liefde = `${process.env.DATA_Q}%20liefde&authorization=${process.env.DATA_AUTH}&page=1&refine=true&output=json`;

console.log(winter);
let requestOne = axios.get(winter);
let requestTwo = axios.get(spannend);
let requestThree = axios.get(monsters);
let requestFour = axios.get(grappig);
let requestFive = axios.get(liefde);

router.get("/", async function (req, res, next) {
  axios
    .all([requestOne, requestTwo, requestThree, requestFour, requestFive])
    .then(
      axios.spread((...responses) => {
        const responseOne = dataParser(responses[0].data.results);
        const responseTwo = dataParser(responses[1].data.results);
        const responseThree = dataParser(responses[2].data.results);
        const responseFour = dataParser(responses[3].data.results);
        const responseFive = dataParser(responses[4].data.results);

        res.render("index", {
          responseOne: responseOne,
          responseTwo: responseTwo,
          responseThree: responseThree,
          responseFour: responseFour,
          responseFive: responseFive,
        });
      })
    );
});

module.exports = router;
