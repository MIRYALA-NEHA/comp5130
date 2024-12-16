import userModel from '../models/user' ; 

const handleLogin = ()=>{

}

const handleSignUp = ()=>{

}

const handleProfile = async (req , res)=>{
    console.log(req.body); 
    let user = await userModel.find({email : req.body.email}); 
    res.send(user); 
}

module.exports = {handleLogin , handleSignUp , handleProfile} ;   