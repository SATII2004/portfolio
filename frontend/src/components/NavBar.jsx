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
        <Link to="/">होम</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">डैशबोर्ड</Link>
            {role === 'ROLE_ADMIN' && <Link to="/admin">एडमिन</Link>}
            <span style={styles.userBadge}>{username}</span>
            <button type="button" onClick={logout} style={styles.logout}>
              लॉगआउट
            </button>
          </>
        ) : (
          <>
            <Link to="/login">लॉगिन</Link>
            <Link to="/register">रजिस्टर</Link>
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

