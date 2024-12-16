import express from "express";
const authRouter = express.Router();

import handleGoogle from '../controllers/auth.js' ; 

authRouter.post('/google' , handleGoogle) ; 

export default authRouter ; 