// Importing necessary dependencies
import React, { useContext, useState } from 'react'; // Import React and hooks for state and context management
import '../../styles/admin/manageArticles.css'; // Import CSS for styling the component
import { ArticlesContext } from '../../context/ArticlesContext'; // Import the ArticlesContext

// Functional component for managing articles
function ManageArticles() {
  const context = useContext(ArticlesContext); // Access the ArticlesContext
  const [editedArticles, setEditedArticles] = useState({}); // State to track edits to articles
  const [newArticle, setNewArticle] = useState({ title: '', content: '' }); // State for new article form

  // Display a loading message if context is not ready
  if (!context) {
    return <div>טוען...</div>;
  }

  const { articles, updateArticles } = context; // Destructure articles and updater function from context

  // Handle field changes for editing existing articles
  const handleFieldChange = (id, field, value) => {
    setEditedArticles(prevState => ({
      ...prevState,
      [id]: { ...prevState[id], [field]: value }
    }));
  };

  // Handle field changes for adding a new article
  const handleNewArticleChange = (field, value) => {
    setNewArticle(prevState => ({ ...prevState, [field]: value }));
  };

  // Save changes made to an article
  const saveArticleChanges = (id) => {
    const updatedArticle = editedArticles[id];
    if (updatedArticle) {
      const newArticles = articles.map(article => 
        article.id === id ? { ...article, ...updatedArticle } : article
      );
      updateArticles(newArticles); // Update articles in context
      setEditedArticles(prevState => {
        const newState = { ...prevState };
        delete newState[id]; // Remove the saved article from the editedArticles state
        return newState;
      });
      alert('הכתבה עודכנה בהצלחה'); // Notify user of successful update
    }
  };

  // Add a new article to the list
  const addNewArticle = () => {
    if (newArticle.title && newArticle.content) {
      const articleToAdd = {
        ...newArticle,
        id: Date.now(), // Generate a unique ID for the new article
      };
      updateArticles([...articles, articleToAdd]); // Update articles in context
      setNewArticle({ title: '', content: '' }); // Reset the new article form
      alert('הכתבה החדשה נוספה בהצלחה'); // Notify user of successful addition
    } else {
      alert('נא למלא את כל השדות הנדרשים'); // Prompt user to fill all required fields
    }
  };

  // Delete an article by ID
  const deleteArticle = (id) => {
    const newArticles = articles.filter(article => article.id !== id); // Filter out the deleted article
    updateArticles(newArticles); // Update articles in context
    alert('הכתבה נמחקה בהצלחה'); // Notify user of successful deletion
  };

  // Display a message if there are no articles
  if (!articles) {
    return <div>אין כתבות זמינות</div>;
  }

  return (
    <div className="ma-container">
      <h1 className="ma-title">ניהול כתבות</h1>
      
      {/* Section for adding a new article */}
      <h2 className="ma-subtitle">הוסף כתבה חדשה</h2>
      <div className="ma-new-article-form">
        <input 
          value={newArticle.title} 
          onChange={(e) => handleNewArticleChange('title', e.target.value)}
          placeholder="כותרת הכתבה" 
        />
        <textarea 
          value={newArticle.content} 
          onChange={(e) => handleNewArticleChange('content', e.target.value)}
          placeholder="תוכן הכתבה" 
        />
        <button onClick={addNewArticle} className="ma-add-btn">הוסף כתבה</button>
      </div>

      {/* Section for managing existing articles */}
      <h2 className="ma-subtitle">כתבות קיימות</h2>
      <div className="ma-articles-list">
        {articles.map(article => (
          <div key={article.id} className="ma-article-item">
            <input 
              value={editedArticles[article.id]?.title || article.title} 
              onChange={(e) => handleFieldChange(article.id, 'title', e.target.value)}
              placeholder="כותרת הכתבה" 
            />
            <textarea 
              value={editedArticles[article.id]?.content || article.content} 
              onChange={(e) => handleFieldChange(article.id, 'content', e.target.value)}
              placeholder="תוכן הכתבה" 
            />
            <div className="ma-article-actions">
              <button onClick={() => saveArticleChanges(article.id)} className="ma-save-btn">שמור שינויים</button>
              <button onClick={() => deleteArticle(article.id)} className="ma-delete-btn">מחק</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageArticles; // Export the component for use in other parts of the application
