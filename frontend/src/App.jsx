import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home     from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login    from './pages/Login.jsx';

export default function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', background: '#fff', borderBottom: '1px solid #eee' }}>
        <Link to="/"     style={{ marginRight: 10 }}>Home</Link>
        <Link to="/register" style={{ marginRight: 10 }}>Register</Link>
        <Link to="/login">Login</Link>
      </nav>
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login"    element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}
