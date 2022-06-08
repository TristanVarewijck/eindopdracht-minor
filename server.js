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

//local storage
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

//bestanden definieren
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/boeken", (req, res) => {
  res.render("boeken");
});

app.get("/videos", (req, res) => {
  res.render("videos");
});

//404
app.use(function (req, res) {
  res.status(404).render("404");
});

//app geeft de port terug
app.listen(port, () => {
  console.log("Server is aan");
});
