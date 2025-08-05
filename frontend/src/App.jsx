import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home     from './pages/Home.jsx';
import Register from './pages/register.jsx';
import Login    from './pages/login.jsx';

export default function App() {
  const token = localStorage.getItem('token');
  console.log('🔃 Routing with token=', token);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/register">Register</Link> |{' '}
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login"    element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
