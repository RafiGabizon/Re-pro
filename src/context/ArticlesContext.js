import React, { createContext, useState } from 'react';

export const ArticlesContext = createContext();

const initialArticles = [
  {
    id: 1,
    title: "5 טיפים חשובים למציאת עבודה בחו\"ל",
    content: "מציאת עבודה בחו\"ל יכולה להיות אתגר, אבל עם הטיפים הנכונים, התהליך יכול להיות הרבה יותר קל. ראשית, חשוב לחקור את שוק העבודה במדינת היעד. שנית, התאימו את קורות החיים שלכם לסטנדרטים המקומיים. שלישית, נצלו רשתות חברתיות מקצועיות כמו LinkedIn. רביעית, שקלו ללמוד את השפה המקומית. ולבסוף, היו פתוחים לאפשרויות שונות ומוכנים להתחיל מלמטה."
  },
  {
    id: 2,
    title: "איך להתמודד עם הבדלי תרבות במקום העבודה החדש",
    content: "עבודה בסביבה רב-תרבותית יכולה להיות מאתגרת ומעשירה כאחד. כדי להצליח, חשוב להיות פתוחים וסקרנים לגבי תרבויות אחרות. למדו על המנהגים והנורמות המקומיות לפני שאתם מגיעים. היו סבלניים וגמישים, והבינו שיש דרכים שונות לעשות דברים. תקשורת ברורה ופתוחה היא המפתח. אל תהססו לשאול שאלות ולבקש הבהרות. זכרו, כולם לומדים זה מזה בסביבה רב-תרבותית."
  },
  {
    id: 3,
    title: "היתרונות והחסרונות של עבודה מרחוק בחו\"ל",
    content: "עבודה מרחוק בחו\"ל מציעה הזדמנויות ייחודיות, אך גם אתגרים. היתרונות כוללים גמישות בשעות העבודה, אפשרות לחוות תרבויות חדשות, ולעתים עלות מחיה נמוכה יותר. מצד שני, החסרונות יכולים לכלול בדידות, קשיי תקשורת עם עמיתים בשל הבדלי זמן, ואתגרים טכניים. חשוב לשקול את כל ההיבטים הללו לפני קבלת החלטה לעבוד מרחוק בחו\"ל."
  }
  // ... יתר הכתבות
];

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState(initialArticles);
  const [openArticleId, setOpenArticleId] = useState(null);

  const updateArticles = (newArticles) => {
    setArticles(newArticles);
  };

  const toggleArticle = (id) => {
    setOpenArticleId(openArticleId === id ? null : id);
  };

  return (
    <ArticlesContext.Provider value={{ articles, updateArticles, openArticleId, toggleArticle }}>
      {children}
    </ArticlesContext.Provider>
  );
};