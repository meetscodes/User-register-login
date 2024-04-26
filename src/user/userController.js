const secretkey = "niwhefhwefhwoeoqdjoqj";
import userModel from "./userModel.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    try {
      const isUserExist = await userModel.findOne({ username });
      if (isUserExist) {
        return res.status(400).json({ error: "User already exists" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Error checking user existence" });
    }
  
    try {
      const newUser = await userModel.create({
        username,
        password,
      });
  
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error while user creation" });
    }
  };




const login = async (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const user = await userModel.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

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
      
  } catch (error) {
    return res.status(500).json({ error: "Error while login" });
  }


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
