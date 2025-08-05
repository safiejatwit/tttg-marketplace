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

  return (
    <div style={{ padding: 20 }}>
      <h2>Marketplace Listings</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {items.map(item => (
          <Link 
            key={item._id} 
            to={`/listings/${item._id}`} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
              <img 
                src={item.photos?.[0] || '/placeholder.png'} 
                alt={item.title} 
                style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 4 }} 
              />
              <h3 style={{ margin: '8px 0' }}>{item.title}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
