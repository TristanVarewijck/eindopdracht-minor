var express = require("express");
var router = express.Router();
const app = express();
const axios = require("axios").default;
require("dotenv").config();
const dataParser = require("../modules/dataCleaning.js");
/* GET detail page. */
router.get("/search", async function (req, res, next) {
  res.render("search");
});

app.post("/search", (req, res) => {
  res.json([
    {
      uitkomst: req.body.uitkomst,
      keuze: req.body.keuze,
      prentboek: req.body.prentboek,
    },
  ]);

  console.log(req.body.uitkomst + req.body.keuze + req.body.prentboek);

  const uitkomst = req.body.uitkomst;
  const keuze = req.body.keuze;
  const prentboek = req.body.prentboek;
  const endpoint = "https://zoeken.oba.nl/api/v1/search/?q=";
  const key = "cdb8415c172ec6178b63451e222891a6";
  const detail = "Default";
  const resultaat = `${endpoint}${prentboek}${uitkomst}&authorization=${key}&refine=true&facet=type(${keuze})&output=json`;
  console.log("api: " + resultaat);

  async function handleApi(req, res) {
    const fetchApi = await fetch(resultaat)
      .then((res) => res.json())
      .then((json) => {
        let resultsData = json.results;

        var data = JSON.stringify(resultsData);
        console.log(data);
        localStorage.setItem("item", data);
      });
  }
  handleApi();
});

module.exports = router;
