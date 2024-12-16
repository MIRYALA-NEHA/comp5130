import express from "express";
const userRouter = express.Router() ;

import {handleLogin , handleSignUp , handleProfile, updateProfile} from '../controllers/user-controller.js' ; 
import varifyToken from '../middlewares/verifyToken.js' ;


// userRouter.post('/profile' , varifyToken , handleProfile); 


userRouter.post('/profile' , varifyToken, handleProfile);

userRouter.put('/profile' , varifyToken, updateProfile);

userRouter.post('/login' , handleLogin); 

userRouter.post('/register' , handleSignUp); 

export default userRouter ;