const secretkey = "niwhefhwefhwoeoqdjoqj";
import userModel from "./userModel";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({ error: "all filds are require" });
  }

  try {
    const isUserExist = await userModel.findOne({ username });

    if (isUserExist) {
      res.status(401).json({ error: "user is allredy exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  jwt.sign(
    { username, password },
    secretkey,
    { expiresIn: "7d" },
    (err, token) => {
      if (err) {
        res.status(500).json({ error: "Failed to generate token" });
      } else {
        res.json({
          token,
        });
      }
    }
  );
};

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;

    jwt.verify(token, secretkey, (err, data) => {
      if (err) {
        res.status(401).send({
          result: "token is not valid",
        });
      } else {
        req.user = data;
        // chack in
        next();
      }
    });
  } else {
    res.status(400).send({
      result: "token is not found",
    });
  }
};

const post = (req, res) => {
  res.send(new Array(50));
};
const profile = (req, res) => {
  res.json(req.user);
};

export { login, verifyToken, profile, post, register };
