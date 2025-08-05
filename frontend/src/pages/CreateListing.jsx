// frontend/src/pages/CreateListing.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

export default function CreateListing() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    condition: 'Good',
    availabilityEnd: '',
  });
  const [files, setFiles] = useState([]);        // holds File objects
  const [previews, setPreviews] = useState([]);  // holds preview URLs
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFiles = e => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    // Generate preview URLs
    setPreviews(selected.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = new FormData();
      // Append fields
      Object.entries(form).forEach(([key, val]) => {
        data.append(key, val);
      });
      // Append each file under “photos”
      files.forEach((file, idx) => {
        data.append('photos', file);
      });

      // Tell Axios not to set JSON headers
      await api.post('/items', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Release previews
      previews.forEach(url => URL.revokeObjectURL(url));
      navigate('/listings');
    } catch (err) {
      console.error(err);
      alert('Failed to create listing');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-form" encType="multipart/form-data">
      <h2>Create Listing</h2>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input id="description" name="description" type="text" onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input id="price" name="price" type="number" onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="condition">Condition</label>
        <select id="condition" name="condition" onChange={handleChange}>
          {['New','Like-new','Good','Fair'].map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="availabilityEnd">Availability End</label>
        <input id="availabilityEnd" name="availabilityEnd" type="date" onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="photos">Photos</label>
        <input
          id="photos"
          name="photos"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFiles}
        />
      </div>

      {previews.length > 0 && (
        <div className="listings-container" style={{ marginBottom: '1rem' }}>
          {previews.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Preview ${i+1}`}
              style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 8, borderRadius: 4 }}
            />
          ))}
        </div>
      )}

      <button type="submit">Post Listing</button>
    </form>
  );
}
