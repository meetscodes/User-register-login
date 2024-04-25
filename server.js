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

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authentication"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;

    next();
  } else {
    res.send({
      result: "token is not valid",
    });
  }
};

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secretkey, (err, authData) => {
    if (err) {
      res.send({
        result: "token is not valid",
      });
    } else {
      res.json({
        authData,
      });
    }
  });
});




app.listen(3000, () => {
  console.log("server running on port 3000");
});
