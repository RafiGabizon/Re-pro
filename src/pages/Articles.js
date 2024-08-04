import React, { useContext } from 'react';
import '../styles/articles.css';
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { ArticlesContext } from '../context/ArticlesContext';

export default function Articles() {
  const { articles, toggleArticle, openArticleId } = useContext(ArticlesContext);

  return (
    <div className="articles-container">
      <h1 className="articles-title">כתבות מעניינות</h1>
      <div className="articles-list">
        {articles.map((article) => (
          <div key={article.id} className="article-item">
            <div 
              className="article-header" 
              onClick={() => toggleArticle(article.id)}
            >
              <h2>{article.title}</h2>
              {openArticleId === article.id ? <PiCaretUpBold /> : <PiCaretDownBold />}
            </div>
            {openArticleId === article.id && (
              <div className="article-content">
                <p>{article.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}