import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { JobsProvider } from './context/JobsContext';
import { HomePageProvider } from './context/HomePageContext';
import { ArticlesProvider } from './context/ArticlesContext';

ReactDOM.render(
  <React.StrictMode>
    <JobsProvider>
      <HomePageProvider>
        <ArticlesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ArticlesProvider>
      </HomePageProvider>
    </JobsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);