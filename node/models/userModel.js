const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
// כדי שנוכל לתקשר עם קובץ נקוד אי אן וי של משתנים נסתרים
require("dotenv").config();

console.log(process.env.TOKEN_SECRET);
const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  // קובע תפקיד של משתמש אם הוא אדמין או יוזר
  role:{
    type:String, default:"user"
  }
},{timestamps:true})

exports.UserModel = mongoose.model("users",userSchema)

// יצירת טוקן
exports.createToken = (user_id,role) => {
  // jwt.sign - יצירת טוקן
  // מקבל 3 פרמטרים, הראשון התכולה , במקרה שלנו האיי די של היוזר
  // השני המילה הסודית , שתשמש אותנו כדי לפענח,ושלישי התוקף שלו
  // process.env.TOKEN_SECRET - לוקח מקובץ נקוד אי אן וי את המשתנה שהקובץ עצמו סודי
  const token = jwt.sign({_id:user_id,role},process.env.TOKEN_SECRET,
  {expiresIn:"600mins"});
  return token;
}


exports.validateUser = (_reqBody) => {
  const joiSchema = Joi.object({
    name:Joi.string().min(2).max(100).required(),
    email:Joi.string().min(2).max(100).email().required(),
    password:Joi.string().min(3).max(20).required()
  })
  return joiSchema.validate(_reqBody)
}

// וולדזציה להתחברות שבה צריך רק מייל וסיסמא מהמשתמש בבאדי
exports.validateLogin = (_reqBody) => {
  const joiSchema = Joi.object({
    email:Joi.string().min(2).max(100).email().required(),
    password:Joi.string().min(3).max(20).required()
  })
  return joiSchema.validate(_reqBody)
}
