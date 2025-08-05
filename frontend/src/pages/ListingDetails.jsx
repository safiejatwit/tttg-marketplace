// frontend/src/pages/ListingDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api.js';

export default function ListingDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    api.get(`/items/${id}`)
       .then(res => setItem(res.data))
       .catch(err => console.error(err));
  }, [id]);

  if (!item) return <p style={{ padding: 20 }}>Loading…</p>;
  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>{item.title}</h1>
      <img 
        src={item.photos?.[0] || '/placeholder.png'} 
        alt={item.title} 
        style={{ width: '100%', borderRadius: 8, margin: '1rem 0' }} 
      />
      <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
      <p><strong>Condition:</strong> {item.condition}</p>
      <p>{item.description}</p>
      <p><em>Seller:</em> {item.sellerId.name}</p>
    </div>
  );
}
