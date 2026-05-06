import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
try {
  const decodedPath = decodeURIComponent(window.location.pathname);
  console.log("Chemin décodé :", decodedPath);
} catch (error) {
  console.error("❌ Erreur lors du décodage de l'URL :", error.message);
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

