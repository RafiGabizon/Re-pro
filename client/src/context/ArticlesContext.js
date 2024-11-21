// Importing necessary dependencies
import React, { createContext, useState } from 'react'; // Import React and hooks for state and context management

// Creating a context for articles
export const ArticlesContext = createContext(); // Export the ArticlesContext for use in other components

// Initial articles data
const initialArticles = [
  {
    id: 1,
    title: "5 טיפים חשובים למציאת עבודה בחו\"ל", // Article title
    content: "מציאת עבודה בחו\"ל יכולה להיות אתגר, אבל עם הטיפים הנכונים, התהליך יכול להיות הרבה יותר קל. ראשית, חשוב לחקור את שוק העבודה במדינת היעד. שנית, התאימו את קורות החיים שלכם לסטנדרטים המקומיים. שלישית, נצלו רשתות חברתיות מקצועיות כמו LinkedIn. רביעית, שקלו ללמוד את השפה המקומית. ולבסוף, היו פתוחים לאפשרויות שונות ומוכנים להתחיל מלמטה." // Article content
  },
  {
    id: 2,
    title: "איך להתמודד עם הבדלי תרבות במקום העבודה החדש", // Article title
    content: "עבודה בסביבה רב-תרבותית יכולה להיות מאתגרת ומעשירה כאחד. כדי להצליח, חשוב להיות פתוחים וסקרנים לגבי תרבויות אחרות. למדו על המנהגים והנורמות המקומיות לפני שאתם מגיעים. היו סבלניים וגמישים, והבינו שיש דרכים שונות לעשות דברים. תקשורת ברורה ופתוחה היא המפתח. אל תהססו לשאול שאלות ולבקש הבהרות. זכרו, כולם לומדים זה מזה בסביבה רב-תרבותית." // Article content
  },
  {
    id: 3,
    title: "היתרונות והחסרונות של עבודה מרחוק בחו\"ל", // Article title
    content: "עבודה מרחוק בחו\"ל מציעה הזדמנויות ייחודיות, אך גם אתגרים. היתרונות כוללים גמישות בשעות העבודה, אפשרות לחוות תרבויות חדשות, ולעתים עלות מחיה נמוכה יותר. מצד שני, החסרונות יכולים לכלול בדידות, קשיי תקשורת עם עמיתים בשל הבדלי זמן, ואתגרים טכניים. חשוב לשקול את כל ההיבטים הללו לפני קבלת החלטה לעבוד מרחוק בחו\"ל." // Article content
  }
  // Additional articles can be added here
];

// Provider component for the ArticlesContext
export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState(initialArticles); // State for managing the articles list
  const [openArticleId, setOpenArticleId] = useState(null); // State to track which article is currently open

  // Function to update the articles list
  const updateArticles = (newArticles) => {
    setArticles(newArticles); // Update the articles state with the new list
  };

  // Function to toggle the visibility of an article
  const toggleArticle = (id) => {
    setOpenArticleId(openArticleId === id ? null : id); // Open or close the article based on its ID
  };

  return (
    <ArticlesContext.Provider value={{ articles, updateArticles, openArticleId, toggleArticle }}>
      {children} {/* Render the children components that will consume the context */}
    </ArticlesContext.Provider>
  );
};
