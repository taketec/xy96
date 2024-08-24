import React from 'react';
import { HashRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; // Import your Login component
import Register from './pages/Register';
import Username from './pages/Username'; // Import your Username component
import Payment from './components/Payment'
import Threejs from './components/Threejs';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/username" element={<Username />} /> {/* New route for Username component */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/three" element={<Threejs />} />
        <Route path="/main" element={<MainPage />} />

        <Route
            exact
            path="/"
            element={<Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
