import jwt from "jsonwebtoken" ;   
import logger from '../middlewares/logger.js';

const varifyToken = (req , res , next)=>{
    const headerAuthorization = req.headers.authorization ; 
    if(headerAuthorization && headerAuthorization.startsWith("JWT")){
        const token = headerAuthorization.split(" ")[1];
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        logger.info("User verified : "+token.user)
        next();
    }
    else {
        return res.status(200).send({tokenVerified : false}) ; 
    }
}

// module.exports = varifyToken ; 
export default varifyToken ; 