import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUserTie
} from 'react-icons/fa';
import './MyPurchases.css';
import { Link } from "react-router-dom";

// English label + Serbian value
const statusOptions = [
  { label: 'Pending',   value: 'u toku' },
  { label: 'Canceled',  value: 'otkazano' },
  { label: 'Completed', value: 'zavrseno' }
];

const paymentOptions = [
  { label: 'Card',   value: 'Platna kartica' },
  { label: 'Cash',   value: 'Gotovina' },
  { label: 'Credit', value: 'Kredit' }
];

// Convert Serbian DB value → English label
const displayStatus = serbian => {
  const found = statusOptions.find(o => o.value === serbian);
  return found ? found.label : serbian;
};

// Map any stored value to one of our CSS classes
const statusClass = serbian => {
  switch (serbian) {
    case 'u toku':   return 'pending';
    case 'otkazano': return 'canceled';
    case 'zavrseno': return 'completed';
    default:         return '';
  }
};

const MyPurchases = () => {
  const token = sessionStorage.getItem('auth_token');
  const [purchases, setPurchases] = useState([]);
  const [error, setError]         = useState('');
  const [editing, setEditing]     = useState(null);
  const [formData, setFormData]   = useState({
    datum: '',
    nacinPlacanja: '',
    status_kupovine: ''
  });

  // fetch
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('http://localhost:8000/api/kupovine')
      .then(resp => {
        setPurchases(resp.data.kupovine);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load purchases.');
      });
  }, [token]);

  const openEdit = p => {
    setEditing(p);
    setFormData({
      datum:           p.datum.slice(0,10),
      nacinPlacanja:   p.nacinPlacanja,
      status_kupovine: p.status_kupovine
    });
  };
  const closeEdit = () => {
    setEditing(null);
    setError('');
  };

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/kupovine/${editing.id}`,
        {
          datum:           formData.datum,
          nacinPlacanja:   formData.nacinPlacanja,
          status_kupovine: formData.status_kupovine
        }
      );
      // reflect in UI
      setPurchases(ps =>
        ps.map(p =>
          p.id === editing.id
            ? { ...p, ...formData }
            : p
        )
      );
      closeEdit();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update.');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this purchase?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/kupovine/${id}`);
      setPurchases(ps => ps.filter(p => p.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete.');
    }
  };

  return (
    <div className="purchases-container">
      <nav className="breadcrumbs">
              <Link to="/home">Home</Link> / <span>My Purchases</span>
        </nav>
      <h1 className="purchases-title">My Purchases</h1>
      {error && <div className="error-message">{error}</div>}

      <div className="purchases-list">
        {purchases.map(p => (
          <div key={p.id} className="purchase-card">
            <h3 className="purchase-property">
              {p.nekretnina.vrstaNekretnine}
            </h3>
            <p><FaMapMarkerAlt /> {p.nekretnina.adresa}, {p.nekretnina.grad}</p>
            <p><FaUserTie /> Agent: {p.agent.imePrezime}</p>
            <p><FaCalendarAlt /> {new Date(p.datum).toLocaleDateString()}</p>
            <p><FaMoneyBillWave /> {p.nacinPlacanja}</p>

            <p className="purchase-status">
              Status:
              <span className={`status-badge ${statusClass(p.status_kupovine)}`}>
                {displayStatus(p.status_kupovine)}
              </span>
            </p>

            <div className="card-buttons">
              <button onClick={() => openEdit(p)}   className="edit-btn">Update</button>
              <button onClick={() => handleDelete(p.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="edit-overlay" onClick={closeEdit}>
          <div className="edit-modal" onClick={e => e.stopPropagation()}>
            <button className="edit-close" onClick={closeEdit}>×</button>
            <h2>Update Purchase</h2>

            <form onSubmit={handleUpdate} className="edit-form">
              <label>
                Date:
                <input
                  type="date"
                  value={formData.datum}
                  onChange={e=>setFormData({ ...formData, datum: e.target.value })}
                  required
                />
              </label>

              <label>
                Payment Method:
                <select
                  value={formData.nacinPlacanja}
                  onChange={e=>setFormData({ ...formData, nacinPlacanja: e.target.value })}
                  required
                >
                  {paymentOptions.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </label>

              <label>
                Status:
                <select
                  value={formData.status_kupovine}
                  onChange={e=>setFormData({ ...formData, status_kupovine: e.target.value })}
                  required
                >
                  {statusOptions.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </label>

              <button type="submit" className="update-btn">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPurchases;
