import React, {useState, useEffect} from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/dashboard';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

function App() {

  return (
    <Router>
      <div>
        <section>                              
            <Routes>  
               <Route path="/" element={<Signup/>}/>
               <Route path="/login" element={<Login/>}/>
               <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}

export default App;