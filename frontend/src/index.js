import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import { BrowserRouter as Router } from "react-router-dom";
import { DiceProvider } from "./context/dice";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <DiceProvider>
      <App />
    </DiceProvider>
    </Router>
  </React.StrictMode>
);
