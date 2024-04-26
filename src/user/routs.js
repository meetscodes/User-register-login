import express from 'express';
import { login,verifyToken,profile,post,register } from './userController.js';


const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/profile',verifyToken,profile);
userRouter.get('/post',verifyToken,post);



export default userRouter;

