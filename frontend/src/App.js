import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; // Import your Login component
import Register from './pages/Register';
import Username from './pages/Username'; // Import your Username component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/username" element={<Username />} /> {/* New route for Username component */}
      </Routes>
    </Router>
  );
}

export default App;
