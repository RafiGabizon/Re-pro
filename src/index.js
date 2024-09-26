import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { JobsProvider } from './context/JobsContext';
import { HomePageProvider } from './context/HomePageContext';
import { ArticlesProvider } from './context/ArticlesContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <JobsProvider>
      <HomePageProvider>
        <ArticlesProvider>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <App />
          </BrowserRouter>
        </ArticlesProvider>
      </HomePageProvider>
    </JobsProvider>
  </React.StrictMode>
);
