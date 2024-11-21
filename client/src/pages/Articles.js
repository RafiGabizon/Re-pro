// Importing necessary dependencies
import React, { useContext } from 'react'; // Import React and context hook
import '../styles/articles.css'; // Import CSS for styling the component
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi"; // Import icons for visual feedback
import { ArticlesContext } from '../context/ArticlesContext'; // Import the context to access articles data

// Functional component to display a list of articles
export default function Articles() {
  const { articles, toggleArticle, openArticleId } = useContext(ArticlesContext); 
  // Destructure articles, toggleArticle function, and the ID of the currently opened article from context

  return (
    <div className="articles-container">
      <h1 className="articles-title">כתבות מעניינות</h1> {/* Title of the section */}
      
      <div className="articles-list">
        {articles.map((article) => ( // Iterate over articles array to render each article
          <div key={article.id} className="article-item"> {/* Unique key for each article */}
            
            {/* Header of the article */}
            <div 
              className="article-header" 
              onClick={() => toggleArticle(article.id)} // Toggle the visibility of the article content
            >
              <h2>{article.title}</h2> {/* Display the title of the article */}
              {openArticleId === article.id ? <PiCaretUpBold /> : <PiCaretDownBold />} 
              {/* Show appropriate icon based on whether the article is open */}
            </div>

            {/* Display article content only if it is the open article */}
            {openArticleId === article.id && (
              <div className="article-content">
                <p>{article.content}</p> {/* Show the content of the article */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
