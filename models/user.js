import mongoose from "mongoose";
const Schema = mongoose.Schema; 

const userSchema = mongoose.Schema({
    sub: {
      type: String
    },
    email: {
      type: String,
      required : true 
    },
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String
    },
    password: {
      type: String 
    },
    profession:{
      type:String
    },
    enrolledCourses: [],
    cart: []
  });

const userModel = mongoose.model('userModel' , userSchema) ; 
// module.exports = userModel ;
export default userModel; 