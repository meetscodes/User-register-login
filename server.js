const express = require("express");
const jwt = require("jsonwebtoken");

const secretkey = "niwhefhwefhwoeoqdjoqj";

const app = express();


app.listen(3000, () => {
  console.log("server running on port 3000");
});
