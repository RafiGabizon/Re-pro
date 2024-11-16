import React, { createContext, useState, useEffect } from 'react';
import israelImg from "../images/israel_israeli_img.jpg";
import saraImg from "../images/sara_cohen_img.jpg";



export const HomePageContext = createContext();

export const HomePageProvider = ({ children }) => {
  const [homePageData, setHomePageData] = useState({
    openComp: {
      mainTitle: "הזדמנות שלך לקריירה גלובלית",
      description: "אנו מציעים לכם הזדמנות ייחודית לקחת את הקריירה שלכם צעד קדימה ולהתחיל לעבוד בחו\"ל. עם מגוון רחב של משרות בתחומים שונים, נעזור לכם למצוא את ההזדמנות המושלמת עבורכם.",
      videoUrl: "https://www.youtube.com/embed/N1QtAXj9y48?si=7F_4SPD5-_aw1uyg",
      features: [
        "מגוון משרות ברחבי העולם",
        "התאמה אישית לכישורים וניסיון",
        "חוויה תרבותית ייחודית",
        "תמיכה מקצועית לאורך כל הדרך"
      ]
    },
    stages: [
      { title: "הרשמה", description: "מילוי טופס הרשמה מקוון" },
      { title: "ראיון", description: "ראיון אישי עם נציג החברה" },
      { title: "התאמה", description: "התאמת משרה מתאימה לכישורים שלך" },
      { title: "הכנה", description: "הכנה לקראת היציאה לחו\"ל" },
      { title: "יציאה", description: "יציאה לעבודה בחו\"ל" }
    ],
    recommendations: [
      {
        recoName: "ישראל ישראלי",
        jobType: "מהנדס תוכנה",
        spich: "העבודה בחו\"ל פתחה בפני אפשרויות חדשות ומרגשות. ממליץ בחום!",
        mainImg: "../images/israel_israeli_img.jpg"
      },
      {
        recoName: "שרה כהן",
        jobType: "מנהלת שיווק",
        spich: "החוויה התרבותית והמקצועית שרכשתי היא בלתי נשכחת. תודה על ההזדמנות!",
        mainImg: "../images/sara_cohen_img.jpg"
      }
    ]
  });

  const updateHomePageData = (newData) => {
    setHomePageData(newData);
    // כאן תוכל להוסיף לוגיקה לשמירת הנתונים בשרת או ב-localStorage
  };

  useEffect(() => {
    // כאן תוכל להוסיף לוגיקה לטעינת נתונים התחלתיים מהשרת או מ-localStorage
  }, []);

  return (
    <HomePageContext.Provider value={{ homePageData, updateHomePageData }}>
      {children}
    </HomePageContext.Provider>
  );
};
