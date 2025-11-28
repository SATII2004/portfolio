import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { isAuthenticated, role, username, logout } = useAuth();

  return (
    <header style={styles.wrapper}>
      <Link to="/" style={styles.brand}>
        CI/CD Portfolio
      </Link>
      <nav style={styles.links}>
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            {role === 'ROLE_ADMIN' && <Link to="/admin">Admin</Link>}
            <span style={styles.userBadge}>{username}</span>
            <button type="button" onClick={logout} style={styles.logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    alignItems: 'center',
    borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
  },
  brand: { fontWeight: 700, fontSize: '1.25rem' },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  logout: {
    background: '#ef4444',
    color: '#fff',
  },
  userBadge: {
    padding: '0.3rem 0.8rem',
    borderRadius: '999px',
    background: 'rgba(148,163,184,0.2)',
  },
};

