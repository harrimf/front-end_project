import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import Search from './Search';
import Staff from './Staff';




import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";



ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<App />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/add" element={<Add />} />
      <Route path="/update" element={<Update />} />
      <Route path="/delete" element={<Delete />} />
      <Route path="/search" element={<Search />} />





    </Routes>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
