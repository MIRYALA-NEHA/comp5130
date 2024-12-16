import JWT from "jsonwebtoken";
import userModel from '../models/user.js';
import bcrypt from "bcrypt";
import logger from '../middlewares/logger.js';  // Import your logger

const handleGoogle = async (req, res) => {
    try {
        // Decode the Google token
        const decoded = JWT.decode(req.body.googleToken);
        let email = decoded.email;
        let user = await userModel.findOne({ email: email });

        if (!user) {
            // Log user creation attempt
            logger.info(`No existing user found with email ${email}, creating new user.`);
            let name = decoded.name;
            let pic = decoded.picture;  // Assuming you might use it later or log this information
            let tempPass = "!91098#$@-" + decoded.exp + "-top-hash-%(&*F^990Vs" + decoded.iat + "--@2777@*!^#*%!";
            let hashed_pass = await bcrypt.hash(tempPass, 10);

            user = new userModel({
                email: email,
                name: name,
                password: hashed_pass,
            });
            await user.save();
            logger.info(`New user created: ${email}`);
        } else {
            // Log user login attempt
            logger.info(`Existing user found with email ${email}, generating token.`);
        }

        // Prepare payload and generate token
        let payload = {
            name: decoded.name,
            email: email
        };
        let token = JWT.sign(payload, 'Secret JWT String', { expiresIn: "1d" });

        // Log successful token generation
        logger.info(`JWT successfully generated for user ${email}`);

        return res.send({
            "ok": true,
            "token": token,
        });

    } catch (error) {
        // Log errors
        logger.error(`Error in handleGoogle function: ${error.message}`);
        return res.status(500).send({
            "ok": false,
            "error": "An error occurred during Google authentication."
        });
    }
};

export default handleGoogle;
