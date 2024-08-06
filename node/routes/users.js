const express = require("express");
const bcrypt = require("bcrypt");
const {auth, authAdmin} = require("../middleware/auth")
const {UserModel,validateUser,validateLogin,createToken} = require("../models/userModel");

const router = express.Router();

// הגדרת ראוטר של הרואט שנגדיר באפ
router.get("/",(req,res) => {
  res.json({msg:"users endpoint"})
})

// ראוטר שכל התפקיד שלו לבדוק את הטוקן של המשתמש
// ובנוסף מחזיר את הפרטים כולל התפקיד של המשתמש
router.get("/checkToken", auth, async(req,res) => {
  res.json(req.tokenData)
})



// ,auth - פונקציית אמצע של ראוטר לאימות משתמש
router.get("/userInfo", auth ,async(req,res) => {
  // res.json({msg:"success !",data:req.tokenData})

  // password: 0 יחזיר את כל המאפיינים מלבד הסיסמא
  try{
    const user = await UserModel.findOne({_id:req.tokenData._id},{password:0})
    res.json(user);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
  
})

// אזור שמחזיר רשימה של משתמשים שרק משתמש אדמין יכול להיות בו
router.get("/list", authAdmin,async(req,res) => {
  try{
    const skip = req.query.skip || 0;
    const data = await UserModel.find({},{password:0}).limit(20).skip(skip);
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})


router.post("/",async(req,res) => {
  const validBody = validateUser(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    const user = new UserModel(req.body);
    // הצפנת סיסמא עם ספריית ביקריפט
    // 10 - רמת הצפנה
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    // מסתירים מהצד לקוח איך הסיסמא נראת אחרי הצפנה
    user.password = "****";
    res.status(201).json(user);
  }
  catch(err){
    if(err.code == 11000){
      return res.status(400).json({msg:"Email already in system",code:11000})
    }
    console.log(err);
    res.status(502).json({err})
  }
})


router.post("/login",async(req,res) => {
  const validBody = validateLogin(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    // נבדוק אם המייל שנשלח בבאדי קיים במסד נתונים
    const user = await UserModel.findOne({email:req.body.email})
    if(!user){
      return res.status(401).json({err:"Email not in system"});
    }
    // לבדוק אם הסיסמא המוצפנת ברשומה מתאימה לסיסמא שמגיע מהצד לקוח בבאדי
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
      return res.status(401).json({err:"password not match"});
    }
    const token = createToken(user._id, user.role);
    // נצטרך לשלוח לצד לקוח טוקן
    res.cookie("token",token,{
        httpOnly: false,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 ),
    }).json({token,msg:"You logged in",role:user.role})
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.post("/logout", async(req,res) => {
  res.clearCookie("token").json({msg:"you logged out"})
})

// מאפשר לאדמין להפוך משתמש אחר לאדמין או למשתמש רגיל
router.patch("/role/:id/:role",authAdmin, async(req,res) => {
  try{
    const id = req.params.id;
    const role = req.params.role;
    if(id == req.tokenData._id){
      return res.status(401).json({err:"you cant edit your self"})
    }
    const data = await UserModel.updateOne({_id:id},{role});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

// export default
module.exports = router;