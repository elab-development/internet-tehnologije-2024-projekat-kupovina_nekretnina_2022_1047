import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUserTie
} from 'react-icons/fa';
import './MyPurchases.css';

const statusOptions = [
  { label: 'Pending',   value: 'u toku' },
  { label: 'Canceled', value: 'otkazano' },
  { label: 'Completed', value: 'zavrseno' }
];

const paymentOptions = [
  { label: 'Card',   value: 'Card' },
  { label: 'Cash',   value: 'Cash' },
  { label: 'Credit', value: 'Credit' }
];

// display Serbian label from English or vice versa
const displayStatus = eng => {
  if ( eng === 'u toku')   return 'Pending';
  if ( eng === 'otkazano') return 'Canceled';
  if ( eng === 'zavrseno') return 'Completed';
  return eng;
};

// map actual status value (Serbian or English) → English classname
const statusClass = val => {
  if (val === 'pending'   || val === 'u toku')   return 'pending';
  if (val === 'canceled'  || val === 'otkazano') return 'canceled';
  if (val === 'completed' || val === 'zavrseno') return 'completed';
  return '';
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

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('http://localhost:8000/api/kupovine')
      .then(resp => setPurchases(resp.data.kupovine))
      .catch(err => {
        console.error(err);
        setError(err.response?.data?.error || 'Failed to load purchases.');
      });
  }, [token]);

  const openEdit = p => {
    setEditing(p);
    setFormData({
      datum: p.datum.slice(0,10),
      nacinPlacanja: p.nacinPlacanja,
      status_kupovine: statusClass(p.status_kupovine)
    });
  };

  const closeEdit = () => {
    setEditing(null);
    setError('');
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(
        `http://localhost:8000/api/kupovine/${editing.id}`,
        {
          datum: formData.datum,
          nacinPlacanja: formData.nacinPlacanja,
          status_kupovine: formData.status_kupovine
        }
      );
      setPurchases(ps =>
        ps.map(p =>
          p.id === editing.id
            ? { ...p, 
                datum: formData.datum, 
                nacinPlacanja: formData.nacinPlacanja,
                status_kupovine: formData.status_kupovine
              }
            : p
        )
      );
      closeEdit();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to update.');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this purchase?')) return;
    setError('');
    try {
      await axios.delete(`http://localhost:8000/api/kupovine/${id}`);
      setPurchases(ps => ps.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to delete.');
    }
  };

  return (
    <div className="purchases-container">
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
              <button onClick={() => openEdit(p)} className="edit-btn">
                Update
              </button>
              <button onClick={() => handleDelete(p.id)} className="delete-btn">
                Delete
              </button>
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
                  onChange={e => setFormData({...formData, datum: e.target.value})}
                  required
                />
              </label>
              <label>
                Payment Method:
                <select
                  value={formData.nacinPlacanja}
                  onChange={e => setFormData({...formData, nacinPlacanja: e.target.value})}
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
                  onChange={e => setFormData({...formData, status_kupovine: e.target.value})}
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
