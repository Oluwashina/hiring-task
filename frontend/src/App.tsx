import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/SignUp';
import Sidebar from './components/Sidebar';
import HomePage from './pages/Home';

function App() {
  return (
   <div>
       <Router>
         <Routes>    
            <Route path="/"  element={<LoginPage />} />
            <Route path="/sign-up" element={<RegisterPage />} />
            <Route
              path="/home"
              element={
                 <Sidebar title="Tasks Home" children={<HomePage />} />       
              }
             />
        </Routes>
      </Router>
   </div>
  );
}

export default App;
