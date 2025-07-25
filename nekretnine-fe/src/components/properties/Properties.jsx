import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaMapMarkerAlt,
  FaRulerCombined,
  FaBed,
  FaDollarSign
} from 'react-icons/fa';
import { Link } from "react-router-dom";
import './Properties.css';

const sketchfabUrls = [
  'https://sketchfab.com/models/a9c25cf22b2c4dd29b07efb7a46e7644/embed?autostart=1&camera=0&ui_theme=dark',
  'https://sketchfab.com/models/e034a0d410774752b456cedd1281a094/embed',
  'https://sketchfab.com/models/6504046fec6340f9a59ed216c1f9adc9/embed',
  'https://sketchfab.com/models/832d8d29f5184101a10ca0479952d31d/embed',
  'https://sketchfab.com/models/9f0343aff4814b758dc6e905aba5b5e0/embed',
  'https://sketchfab.com/models/ba280f48e8c440eb8f902eae9b37a251/embed'
];

const getAccentColor = (type) => {
  switch (type.toLowerCase()) {
    case 'penthaus': return '#E6B31E';
    case 'vikendica': return '#1EE6B3';
    case 'vila':      return '#B31E8E';
    case 'kuca':      return '#1E3CE6';
    default:          return '#fff';
  }
};

const Properties = () => {
  const token = sessionStorage.getItem('auth_token');

  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
  const [page, setPage]             = useState(1);
  const [perPage]                   = useState(5);

  const [searchType, setSearchType] = useState('');
  const [error, setError]           = useState('');

  const [detail, setDetail]     = useState(null);
  const [modelUrl, setModelUrl] = useState('');

  // Purchase form state
  const [agents, setAgents]               = useState([]);
  const [agentId, setAgentId]             = useState('');
  const [purchaseDate, setPurchaseDate]   = useState(new Date().toISOString().slice(0,10));
  const [paymentMethod, setPaymentMethod] = useState('Card');
  // status_kupovine is always 'pending'
  
  // Attach token and fetch agents
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('http://localhost:8000/api/agents')
      .then(r => setAgents(r.data))
      .catch(() => {});
  }, [token]);

  // Fetch properties on mount & page change
  useEffect(() => { fetchList(); }, [page]);

  const fetchList = async () => {
    try {
      const r = await axios.get('http://localhost:8000/api/nekretnine', {
        params: { per_page: perPage, page }
      });
      setProperties(r.data.nekretnine);
      setPagination(r.data.pagination);
      setError('');
    } catch (e) {
      setError(e.response?.data?.error || 'Could not load properties.');
    }
  };

  const handleSearch = async () => {
    if (!searchType.trim()) return fetchList();
    try {
      const r = await axios.get('http://localhost:8000/api/pretraga-nekretnina', {
        params: { vrsta: searchType, per_page: perPage }
      });
      setProperties(r.data.nekretnine);
      setPagination(r.data.pagination);
      setPage(1);
      setError('');
    } catch (e) {
      setError(e.response?.data?.error || 'Search failed.');
      setProperties([]);
    }
  };

  const openDetail = async (id) => {
    try {
      const r = await axios.get(`http://localhost:8000/api/nekretnine/${id}`);
      setDetail(r.data.nekretnina);
      setError('');
      const randomUrl = sketchfabUrls[
        Math.floor(Math.random() * sketchfabUrls.length)
      ];
      setModelUrl(randomUrl);
    } catch (e) {
      setError(e.response?.data?.error || 'Could not load details.');
    }
  };

// inside Properties.jsx
const handleBuy = async (e) => {
  e.preventDefault();
  setError('');

  try {
    await axios.post(
      'http://localhost:8000/api/kupovine',
      {
        nekretnina_id: detail.id,
        agent_id: agentId,
        datum: purchaseDate,
        nacinPlacanja: paymentMethod,
        status_kupovine: 'u toku',    // or whatever your DB expects
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    alert('Purchase successful!');

    // **RESET THE FORM FIELDS**
    setAgentId('');
    setPurchaseDate(new Date().toISOString().slice(0,10));
    setPaymentMethod('Card');

    // close the popup
    setDetail(null);

  } catch (err) {
    console.error('Purchase error:', err);

    if (err.response) {
      if (err.response.status >= 500) {
        setError('Server error, please try again later.');
      } else {
        setError(err.response.data.error || err.response.data.message || 'Purchase failed.');
      }
    } else if (err.request) {
      setError('No response from server. Check your connection.');
    } else {
      setError('Error: ' + err.message);
    }
  }
};

  return (
    <div className="properties-container">

       <nav className="breadcrumbs">
        <Link to="/home">Home</Link> / <span>Properties</span>
      </nav>
      <h1 className="properties-title">Properties</h1>

      <div className="properties-controls">
        <input
          className="search-input"
          placeholder="Search by type"
          value={searchType}
          onChange={e=>setSearchType(e.target.value)}
        />
        <button className="btn" onClick={handleSearch} style={{fontSize:'20px'}}>
          Search
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="properties-list">
        {properties.map(p=>(
          <div
            key={p.id}
            className="property-card"
            style={{borderLeft:`5px solid ${getAccentColor(p.vrstaNekretnine)}`}}
            onClick={()=>openDetail(p.id)}
          >
            <h3 className="property-type">{p.vrstaNekretnine}</h3>
            <div className="property-info">
              <p><FaMapMarkerAlt /> {p.adresa}, {p.grad}</p>
              <p><FaRulerCombined /> {p.povrsina} m²</p>
              <p><FaBed /> {p.brojSoba} rooms</p>
              <p><FaDollarSign /> ${p.cena}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={()=>setPage(p=>p-1)}
          disabled={pagination.current_page===1}
          style={{fontSize:'20px'}}
        >Prev</button>
        <span style={{fontSize:'30px',color:'white'}}>
          Page {pagination.current_page} / {pagination.last_page}
        </span>
        <button
          onClick={()=>setPage(p=>p+1)}
          disabled={pagination.current_page===pagination.last_page}
          style={{fontSize:'20px'}}
        >Next</button>
      </div>

      {detail && (
        <div className="detail-overlay" onClick={()=>setDetail(null)}>
          <div className="detail-popup" onClick={e=>e.stopPropagation()}>
            <button className="detail-top-close" onClick={()=>setDetail(null)}>×</button>

            <img
              className="detail-image"
              src={`https://picsum.photos/seed/${detail.id}/800/400`}
              alt={detail.vrstaNekretnine}
            />

            <div className="detail-info">
              <h2>{detail.vrstaNekretnine}</h2>
              <p><FaMapMarkerAlt /> {detail.adresa}, {detail.grad}</p>
              <p><FaRulerCombined /> {detail.povrsina} m²</p>
              <p><FaBed /> {detail.brojSoba} rooms</p>
              <p><FaDollarSign /> ${detail.cena}</p>
            </div>

            <div className="detail-model">
              <iframe
                title="3D Property Model"
                src={modelUrl}
                allow="autoplay; fullscreen; xr-spatial-tracking"
              />
            </div>

            <form className="purchase-form" onSubmit={handleBuy}>
              <h3>Buy This Property</h3>
              <select
                required
                value={agentId}
                onChange={e=>setAgentId(e.target.value)}
              >
                <option value="">Select Agent</option>
                {agents.map(a=>(
                  <option key={a.id} value={a.id}>{a.imePrezime}</option>
                ))}
              </select>
              <input
                type="date"
                value={purchaseDate}
                onChange={e=>setPurchaseDate(e.target.value)}
                required
              />
              <select
                required
                value={paymentMethod}
                onChange={e=>setPaymentMethod(e.target.value)}
              >
                <option value="Platna kartica">Card</option>
                <option value="Gotovina">Cash</option>
                <option value="Kredit">Credit</option>
              </select>
              <button type="submit" className="btn purchase-btn">Buy</button>
            </form>

            <button className="btn detail-close" onClick={()=>setDetail(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
