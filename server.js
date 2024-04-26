import express from "express";
import bodyParser from "body-parser";
import connect from "./src/db.js";
import userRouter from "./src/user/routs.js";

const app = express();
app.use(bodyParser.json());

connect();

app.use('/api/user',userRouter)


app.listen(3000, () => {
  console.log("server running on port 3000");
});
