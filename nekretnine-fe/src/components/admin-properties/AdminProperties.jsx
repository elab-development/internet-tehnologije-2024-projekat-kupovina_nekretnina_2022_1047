import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaMapMarkerAlt,
  FaRulerCombined,
  FaBed,
  FaDollarSign,
  FaPlus
} from 'react-icons/fa';
import './AdminProperties.css';
import { Link } from "react-router-dom";

const accentFor = (type) => {
  switch (type.toLowerCase()) {
    case 'penthaus': return '#E6B31E';
    case 'vikendica': return '#1EE6B3';
    case 'vila':      return '#B31E8E';
    case 'kuca':      return '#1E3CE6';
    default:          return '#FFF';
  }
};

const AdminProperties = () => {
  const token = sessionStorage.getItem('auth_token');
  const [propsList, setPropsList] = useState([]);
  const [page, setPage]           = useState(1);
  const [pagination, setPagination] = useState({ current_page:1, last_page:1 });
  const [error, setError]         = useState('');
  const [showForm, setShowForm]   = useState(false);
  const [form, setForm] = useState({
    vrstaNekretnine: '',
    adresa: '',
    grad: '',
    povrsina: '',
    brojSoba: '',
    cena: ''
  });

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchPage(page);
  }, [token, page]);

  const fetchPage = async (pg) => {
    try {
      const res = await axios.get('http://localhost:8000/api/nekretnine', {
        params: { per_page: 5, page: pg }
      });
      setPropsList(res.data.nekretnine);
      setPagination(res.data.pagination);
      setError('');
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to load properties.');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8000/api/nekretnine',
        form
      );
      // prepend new
      setPropsList((old) => [res.data.nekretnina, ...old]);
      setShowForm(false);
      setForm({
        vrstaNekretnine: '',
        adresa: '',
        grad: '',
        povrsina: '',
        brojSoba: '',
        cena: ''
      });
      setError('');
    } catch (e) {
      setError(e.response?.data?.error || 'Creation failed.');
    }
  };

  return (
    <div className="admin-props-container">
       <nav className="breadcrumbs">
              <Link to="/admin-dashboard">Dashboard</Link> / <span>Manage Properties</span>
        </nav>
      <h1 className="admin-props-title">Manage Properties</h1>

      <button
        className="create-toggle-btn"
        onClick={() => setShowForm((v) => !v)}
      >
        <FaPlus /> {showForm ? 'Cancel' : 'Add Property'}
      </button>

      {showForm && (
        <form className="create-prop-form" onSubmit={handleCreate}>
          <input
            placeholder="Type (e.g. Penthaus)"
            value={form.vrstaNekretnine}
            onChange={(e) =>
              setForm({ ...form, vrstaNekretnine: e.target.value })
            }
            required
          />
          <input
            placeholder="Address"
            value={form.adresa}
            onChange={(e) => setForm({ ...form, adresa: e.target.value })}
            required
          />
          <input
            placeholder="City"
            value={form.grad}
            onChange={(e) => setForm({ ...form, grad: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Area (m²)"
            value={form.povrsina}
            onChange={(e) => setForm({ ...form, povrsina: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Rooms"
            value={form.brojSoba}
            onChange={(e) => setForm({ ...form, brojSoba: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.cena}
            onChange={(e) => setForm({ ...form, cena: e.target.value })}
            required
          />
          <button type="submit" className="submit-btn">
            Create
          </button>
        </form>
      )}

      {error && <div className="admin-error">{error}</div>}

      <div className="props-grid">
        {propsList.map((p) => (
          <div
            key={p.id}
            className="prop-card"
            style={{ borderLeft: `5px solid ${accentFor(p.vrstaNekretnine)}` }}
          >
            <h3 className="prop-type">{p.vrstaNekretnine}</h3>
            <p><FaMapMarkerAlt /> {p.adresa}, {p.grad}</p>
            <p><FaRulerCombined /> {p.povrsina} m²</p>
            <p><FaBed /> {p.brojSoba} rooms</p>
            <p><FaDollarSign /> ${p.cena}</p>
          </div>
        ))}
      </div>

      <div className="admin-pagination">
        <button
          onClick={() => setPage((n) => Math.max(1, n - 1))}
          disabled={pagination.current_page === 1}
        >
          Prev
        </button>
        <span>
          Page {pagination.current_page} / {pagination.last_page}
        </span>
        <button
          onClick={() => setPage((n) => Math.min(pagination.last_page, n + 1))}
          disabled={pagination.current_page === pagination.last_page}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminProperties;
