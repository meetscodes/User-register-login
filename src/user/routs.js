import express from 'express';
import { login,verifyToken,profile,post } from './userController.js';


const userRouter = express.Router();

userRouter.post('/login',login);
userRouter.post('/profile',verifyToken,profile);
userRouter.get('/post',verifyToken,post);



export default userRouter;

