import React,{useState} from 'react';
import{BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Homepage';
import Menu2 from './Pages/Menu2';
import Menu from './Pages/Menu';
import Menu1 from './Pages/Menu1';
import Admin from './Pages/Admin';
import Dashboard from './Pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/Menu2" element={<Menu2 />} />
          <Route path="/Menu1" element={<Menu1 />} />
          
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="*" element ={<HomePage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
