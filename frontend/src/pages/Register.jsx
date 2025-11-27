import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'ROLE_USER' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'रजिस्ट्रेशन विफल रहा');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>रजिस्टर</h2>
        <input placeholder="Username" name="username" value={form.username} onChange={handleChange} required />
        <input
          placeholder="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="ROLE_USER">Role: User</option>
          <option value="ROLE_ADMIN">Role: Admin</option>
        </select>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" disabled={loading} style={styles.primary}>
          {loading ? 'प्रोसेसिंग...' : 'रजिस्टर'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  wrapper: { display: 'grid', placeItems: 'center', minHeight: '70vh', padding: '1rem' },
  card: {
    width: '100%',
    maxWidth: '460px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    border: '1px solid rgba(148,163,184,0.2)',
    padding: '2rem',
    borderRadius: '1rem',
    background: 'rgba(15,23,42,0.8)',
  },
  primary: { background: '#14b8a6', color: '#fff' },
  error: { color: '#f97316' },
};

