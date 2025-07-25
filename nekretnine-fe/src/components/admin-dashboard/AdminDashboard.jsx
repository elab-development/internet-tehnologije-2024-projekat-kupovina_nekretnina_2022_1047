import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as BarTooltip,
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  Legend
} from 'recharts';
import './AdminDashboard.css';

const COLORS = ['#E6B31E', '#1EE6B3', '#B31E8E', '#1E3CE6'];

const AdminDashboard = () => {
  const token = sessionStorage.getItem('auth_token');
  const [metrics, setMetrics] = useState(null);
  const [error, setError]     = useState('');

  useEffect(() => {
    if (!token) {
      setError('No authentication token—please log in.');
      return;
    }

    axios
      .get('http://localhost:8000/api/kupovine/metrics', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setMetrics(res.data.metrics);
      })
      .catch(err => {
        const msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          'Failed to load metrics.';
        setError(msg);
      });
  }, [token]);

  if (error)    return <div className="ad-error">{error}</div>;
  if (!metrics) return <div className="ad-loading">Loading metrics…</div>;

  // prepare for charts
  const statusData = Object.entries(metrics.purchases_by_status || {}).map(
    ([status, count]) => ({
      status:
        status === 'u toku' ? 'Pending'
      : status === 'otkazano' ? 'Canceled'
      : status === 'zavrseno' ? 'Completed'
      : status,
      count
    })
  );

  // transform payment keys to English labels
  const paymentData = Object.entries(metrics.purchases_by_payment || {}).map(
    ([method, count]) => ({
      label:
        method === 'Platna kartica'   ? 'Card'
      : method === 'Gotovina'   ? 'Cash'
      : method === 'Kredit' ? 'Credit'
      : method,
      count
    })
  );

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      <div className="metrics-cards">
        <div className="metric-card">
          <h2>Total Purchases</h2>
          <p>{metrics.total_purchases}</p>
        </div>
        <div className="metric-card">
          <h2>Total Amount Spent</h2>
          <p>${metrics.total_amount_spent.toLocaleString()}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-card">
          <h3>Purchases by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={statusData}
              margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
            >
              <XAxis dataKey="status" stroke="#fff" />
              <YAxis stroke="#fff" />
              <BarTooltip wrapperStyle={{ color: '#000' }} />
              <Bar dataKey="count" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Purchases by Payment Method</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentData}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ label, percent }) =>
                  `${label}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {paymentData.map((entry, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>

              <PieTooltip
                formatter={(value, name, entry) => [value, entry.payload.label]}
                wrapperStyle={{ color: '#000' }}
              />

              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                payload={paymentData.map((entry, idx) => ({
                  value: entry.label,
                  type: 'square',
                  color: COLORS[idx % COLORS.length]
                }))}
                wrapperStyle={{ color: '#fff', marginTop: '1rem' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
