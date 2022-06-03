const axios = require("axios").default;
require("dotenv").config();

const dataParser = require("./cleaning.js");

// Books
const fetchData = () => {
  axios({
    method: "GET",
    url: `${process.env.DATA_ENDPOINT}boek&authorization=${process.env.DATA_AUTH}&refine=true&output=json`,
  }).then((res) => {
    const cleanData = dataParser(res.data.results);
  });
};

module.exports = fetchData;
