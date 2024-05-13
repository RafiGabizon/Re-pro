import React, { useState } from 'react';
import '../styles/styles.css';
import NavbarTop from '../Components/NavbarTop';
import NavbarBottom from '../Components/NavbarBottom';

export default function Jobs_Abroad() {
  const [filter, setFilter] = useState("all"); // ערך ראשי למסנן

  // פונקציה לטיפול בשינוי במסנן
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // נתוני דוגמה של עבודות (החלף זאת בנתונים אמיתיים)
  const jobs = [
    { id: 1, title: "עבודה 1", location: "ארצות הברית" },
    { id: 2, title: "עבודה 2", location: "קנדה" },
    { id: 3, title: "עבודה 3", location: "אוסטרליה" },
    // הוסף עבודות נוספות כרצונך
  ];

  // עבודות מסוננות על פי מיקום
  const filteredJobs = filter === "all" ? jobs : jobs.filter(job => job.location === filter);

  return (
    <div>
      <NavbarTop />
      <div className="Jobs_Abroad">
        <h2>עבודות בחו"ל</h2>
        {/* תיבת בחירת מסנן */}
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">כל המיקומים</option>
          <option value="ארצות הברית">ארצות הברית</option>
          <option value="קנדה">קנדה</option>
          <option value="אוסטרליה">אוסטרליה</option>
          {/* הוסף עוד אפשרויות כרצונך */}
        </select>
        {/* תצוגת העבודות המסוננות */}
        <div>
          {filteredJobs.map(job => (
            <div key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.location}</p>
              {/* הוסף פרטי עבודה נוספים כרצונך */}
            </div>
          ))}
        </div>
      </div>
      <NavbarBottom />
    </div>
  );
}
