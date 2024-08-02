// auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config()
// פונקציית מידלוואר

exports.auth = (req,res,next) => {
  // אוסף את הטוקן של המשתמש מההידר
  // const token = req.header("x-api-key");
  // יבדוק את הטוקן מול הקוקי במקום מול ההידר שהיינו רגילים עד עכשיו
  const token = req.cookies["token"];
  // במידה ולא נשלח טוקן כלל בהידר
  if(!token){
    return res.status(401).json({err:"You need to send token 1111"});
  }
  try{
    // ניסיון פענוח טוקן, אם יצליח המשתנה יכיל את האיי די שנמצא בתוך הטוקן של המשתמש
    const decodeToken = jwt.verify(token,process.env.TOKEN_SECRET);
    // req - מכיל את אותו פויינטר בזכרון של הפונקציה הבאה בשרשור
    // ולכן נכניס לתוכו מאפיינים כמו המידע של הטוקן שנוכל להשתמש בפונקציה הבאה
    req.tokenData = decodeToken
    // הצלחה מעבר לפונקציה הבאה
    next()
  }
  catch(err){
    return res.status(401).json({err:"Token invalid or expired 2222"});
  }
}


// פונקציית אימות 
exports.authAdmin = (req,res,next) => {
  // אוסף את הטוקן של המשתמש מההידר
  // const token = req.header("x-api-key");
  const token = req.cookies["token"];
  // במידה ולא נשלח טוקן כלל בהידר
  if(!token){
    return res.status(401).json({err:"You need to send token 1111"});
  }
  try{
    // ניסיון פענוח טוקן, אם יצליח המשתנה יכיל את האיי די שנמצא בתוך הטוקן של המשתמש
    const decodeToken = jwt.verify(token,process.env.TOKEN_SECRET);
    // בודק אם המשתמש הוא לא אדמין ומשגר לו הודעת שגיאה
    if(decodeToken.role != "admin" && decodeToken.role != "superadmin"){
      return res.status(401).json({err:"Just admin can be in this endpoint"});
    }
    // req - מכיל את אותו פויינטר בזכרון של הפונקציה הבאה בשרשור
    // ולכן נכניס לתוכו מאפיינים כמו המידע של הטוקן שנוכל להשתמש בפונקציה הבאה
    req.tokenData = decodeToken
    // הצלחה מעבר לפונקציה הבאה
    next()
  }
  catch(err){
    return res.status(401).json({err:"Token invalid or expired 2222"});
  }
}