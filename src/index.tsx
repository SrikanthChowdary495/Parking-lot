import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ContextProvider from './context/parkinglotContext';
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import Carderigistration from './Carderigistration'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement || document.createElement('div')
);
root.render(
  <React.StrictMode>
    <ContextProvider>
    <Router>
        <Routes>
        <Route path='/' element={<App />} />
          <Route path='/degistraton' element={<Carderigistration />} />
        </Routes>
      </Router>
    </ContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
