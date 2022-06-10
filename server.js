const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = process.env.PORT || 5000;

//de css, img en js map in de public map gebruiken
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public.css"));
app.use("/img", express.static(__dirname + "public.img"));
app.use("/js", express.static(__dirname + "public.js"));
app.use("/audio", express.static(__dirname + "public.mp3"));

//express layout mobiel formaat en ejs gebruiken
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded());

app.set("layout", "./layouts/formaat");
app.set("view engine", "ejs");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

//local storage
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

//bestanden definieren
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
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
        for (let i = 0; i < json.results.length; i++) {
          let array = [];

          let resultsData = json.results[i];

          let finalData = Object.entries(resultsData);

          for (let i = 0; i < finalData.length; i++) {
            array.push(finalData[i]);
          }

          localStorage.setItem("item", array);

          console.log(array);
        }
      });
  }
  handleApi();
});

app.get("/uitkomst", (req, res) => {
  let item = JSON.parse(localStorage.getItem("item"));
  res.render("uitkomst", {
    item: item,
  });
});

app.get("/boeken", (req, res) => {
  res.render("boeken");
});

app.get("/videos", (req, res) => {
  res.render("videos");
});

//app geeft de port terug
app.listen(port, () => {
  console.log("Server is aan");
});
