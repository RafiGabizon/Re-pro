import React, { useContext, useState } from 'react';
import '../../styles/admin/manageArticles.css';
import { ArticlesContext } from '../../context/ArticlesContext';

function ManageArticles() {
  const context = useContext(ArticlesContext);
  const [editedArticles, setEditedArticles] = useState({});
  const [newArticle, setNewArticle] = useState({ title: '', content: '' });

  if (!context) {
    return <div>טוען...</div>;
  }

  const { articles, updateArticles } = context;

  const handleFieldChange = (id, field, value) => {
    setEditedArticles(prevState => ({
      ...prevState,
      [id]: { ...prevState[id], [field]: value }
    }));
  };

  const handleNewArticleChange = (field, value) => {
    setNewArticle(prevState => ({ ...prevState, [field]: value }));
  };

  const saveArticleChanges = (id) => {
    const updatedArticle = editedArticles[id];
    if (updatedArticle) {
      const newArticles = articles.map(article => 
        article.id === id ? { ...article, ...updatedArticle } : article
      );
      updateArticles(newArticles);
      setEditedArticles(prevState => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });
      alert('הכתבה עודכנה בהצלחה');
    }
  };

  const addNewArticle = () => {
    if (newArticle.title && newArticle.content) {
      const articleToAdd = {
        ...newArticle,
        id: Date.now(),
      };
      updateArticles([...articles, articleToAdd]);
      setNewArticle({ title: '', content: '' });
      alert('הכתבה החדשה נוספה בהצלחה');
    } else {
      alert('נא למלא את כל השדות הנדרשים');
    }
  };

  const deleteArticle = (id) => {
    const newArticles = articles.filter(article => article.id !== id);
    updateArticles(newArticles);
    alert('הכתבה נמחקה בהצלחה');
  };

  if (!articles) {
    return <div>אין כתבות זמינות</div>;
  }

  return (
    <div className="ma-container">
      <h1 className="ma-title">ניהול כתבות</h1>
      
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

export default ManageArticles;