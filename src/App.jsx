import React, {useState, useEffect} from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
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
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}

export default App;

export default App;