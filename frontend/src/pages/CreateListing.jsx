// frontend/src/pages/CreateListing.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

export default function CreateListing() {
  const [form, setForm] = useState({
    title: '', description: '', price: '', condition: 'Good', availabilityEnd: ''
  });
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/items', {
        ...form,
        price: Number(form.price),
        photos: []
      });
      navigate('/listings');
    } catch (err) {
      console.error(err);
      alert('Failed to create listing');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ maxWidth: 400, margin: '2rem auto', padding: 20, background: '#fff', borderRadius: 8 }}
    >
      <h2>Create Listing</h2>
      {['title','description','price','availabilityEnd'].map(name => (
        <div key={name} style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
          <input
            name={name}
            type={name === 'price' ? 'number' : name === 'availabilityEnd' ? 'date' : 'text'}
            value={form[name]}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </div>
      ))}
      <button 
        type="submit" 
        style={{ width: '100%', padding: '0.75rem', background: '#000dff', color: '#fff', border: 'none', borderRadius: 4 }}
      >
        Post Listing
      </button>
    </form>
  );
}
