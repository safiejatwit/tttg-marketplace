// frontend/src/pages/Listings.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import { Link } from 'react-router-dom';

export default function Listings() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/items')
       .then(res => setItems(res.data))
       .catch(err => console.error(err));
  }, []);
  console.log('Current items state:', items);

  return (
    <div className="listings-container">
      <h2 style={{ gridColumn: '1 / -1', textAlign: 'center', marginBottom: '1.5rem' }}>
        Marketplace Listings
      </h2>
      {items.map(item => (
        <Link 
          key={item._id} 
          to={`/listings/${item._id}`} 
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div className="listing-card">
            <img 
              src={item.photos?.[0] || '/placeholder.png'} 
              alt={item.title} 
              className="" 
            />
            <div className="card-body">
              <h3>{item.title}</h3>
              <p className="price">${item.price.toFixed(2)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
