import React from 'react';
import ReactDOM from 'react-dom/client';
//import Header from './components/Header/Header';
import './index.css';
/*import SectionHomePage from './components/HomePage/SectionHomePage';
import Container from './components/HomePage/Container';
import VideoBackground from './components/HomePage/VideoBackground';*/
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
