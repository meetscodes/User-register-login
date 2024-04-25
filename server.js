const express = require("express");
const jwt = require("jsonwebtoken");

const secretkey = "niwhefhwefhwoeoqdjoqj";

const app = express();

app.post("/login", (req, res) => {
  const userdata = req.body;

  jwt.sign({ userdata }, secretkey, { expiresIn: "7d" }, (err, token) => {
    res.json({
      token,
    });
  });
});




app.listen(3000, () => {
  console.log("server running on port 3000");
});
