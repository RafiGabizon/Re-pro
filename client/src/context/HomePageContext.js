// Importing necessary dependencies
import React, { createContext, useState, useEffect } from 'react'; // Import React and hooks for context, state, and lifecycle management
import israelImg from "../images/israel_israeli_img.jpg"; // Import image for Israel Israeli
import saraImg from "../images/sara_cohen_img.jpg"; // Import image for Sara Cohen

// Create a context for the homepage data
export const HomePageContext = createContext(); // Export the HomePageContext for use in other components

// Provider component for the HomePageContext
export const HomePageProvider = ({ children }) => {
  const [homePageData, setHomePageData] = useState({
    // Initial data for the homepage
    openComp: {
      mainTitle: "הזדמנות שלך לקריירה גלובלית", // Main title for the opening component
      description: "אנו מציעים לכם הזדמנות ייחודית לקחת את הקריירה שלכם צעד קדימה ולהתחיל לעבוד בחו\"ל. עם מגוון רחב של משרות בתחומים שונים, נעזור לכם למצוא את ההזדמנות המושלמת עבורכם.", // Description for the opening component
      videoUrl: "https://www.youtube.com/embed/N1QtAXj9y48?si=7F_4SPD5-_aw1uyg", // YouTube video URL
      features: [
        "מגוון משרות ברחבי העולם", // List of features
        "התאמה אישית לכישורים וניסיון",
        "חוויה תרבותית ייחודית",
        "תמיכה מקצועית לאורך כל הדרך"
      ]
    },
    stages: [
      // Steps for the placement process
      { title: "הרשמה", description: "מילוי טופס הרשמה מקוון" },
      { title: "ראיון", description: "ראיון אישי עם נציג החברה" },
      { title: "התאמה", description: "התאמת משרה מתאימה לכישורים שלך" },
      { title: "הכנה", description: "הכנה לקראת היציאה לחו\"ל" },
      { title: "יציאה", description: "יציאה לעבודה בחו\"ל" }
    ],
    recommendations: [
      // Employee recommendations section
      {
        recoName: "ישראל ישראלי", // Name of the recommender
        jobType: "מהנדס תוכנה", // Job type
        spich: "העבודה בחו\"ל פתחה בפני אפשרויות חדשות ומרגשות. ממליץ בחום!", // Speech
        mainImg: israelImg // Image path
      },
      {
        recoName: "שרה כהן", // Name of the recommender
        jobType: "מנהלת שיווק", // Job type
        spich: "החוויה התרבותית והמקצועית שרכשתי היא בלתי נשכחת. תודה על ההזדמנות!", // Speech
        mainImg: saraImg // Image path
      }
    ]
  });

  // Function to update the homepage data
  const updateHomePageData = (newData) => {
    setHomePageData(newData); // Update the state with new data
    // Here you can add logic for saving the data to a server or localStorage
  };

  useEffect(() => {
    // Add logic to load initial data from a server or localStorage
    // This effect runs once on component mount
  }, []);

  return (
    // Provide the homepage data and updater function to the context consumers
    <HomePageContext.Provider value={{ homePageData, updateHomePageData }}>
      {children} {/* Render the children components that will consume the context */}
    </HomePageContext.Provider>
  );
};
