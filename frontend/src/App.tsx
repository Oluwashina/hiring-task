import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/SignUp';

function App() {
  return (
   <div>
       <Router>
         <Routes>    
            <Route path="/"  element={<LoginPage />} />
            <Route path="/sign-up" element={<RegisterPage />} />
        </Routes>
      </Router>
   </div>
  );
}

export default App;
