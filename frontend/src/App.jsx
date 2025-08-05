// frontend/src/App.jsx
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

import Home           from './pages/Home.jsx';
import Register       from './pages/Register.jsx';
import Login          from './pages/Login.jsx';
import Listings       from './pages/Listings.jsx';
import ListingDetails from './pages/ListingDetails.jsx';
import CreateListing  from './pages/CreateListing.jsx';

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav style={{ padding: '1rem', background: '#fff', borderBottom: '1px solid #eee' }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/listings" style={{ marginRight: 10 }}>Marketplace</Link>
        {user && <Link to="/create-listing" style={{ marginRight: 10 }}>Sell an Item</Link>}
        {user ? (
          <>
            <span style={{ marginRight: 10 }}>Hi, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register" style={{ marginRight: 10 }}>Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetails />} />
          <Route
            path="/create-listing"
            element={user ? <CreateListing /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </main>
    </div>
  );
}
