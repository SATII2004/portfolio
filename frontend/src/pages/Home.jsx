import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section style={styles.container}>
      <div>
        <p style={styles.eyebrow}>एंटरप्राइज-ग्रेड पोर्टफोलियो</p>
        <h1 style={styles.heading}>Full-Stack CI/CD + Cloud DevOps सिस्टम</h1>
        <p style={styles.lead}>
          React + Spring Boot + MySQL + Kubernetes + Ansible + Docker के साथ तैयार किया गया
          रिफरेंस प्रोजेक्ट। लॉगिन करें, आइटम मैनेज करें और पूरी पाइपलाइन को ऑटोमेट करें।
        </p>
        <div style={styles.actions}>
          <Link to="/register" style={styles.primary}>
            तुरंत शुरू करें
          </Link>
          <Link to="/dashboard" style={styles.secondary}>
            डेमो देखें
          </Link>
        </div>
      </div>
    </section>
  );
}

const styles = {
  container: {
    display: 'grid',
    placeItems: 'center',
    minHeight: '70vh',
    textAlign: 'center',
    padding: '2rem',
  },
  eyebrow: {
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: '#38bdf8',
    fontWeight: 600,
  },
  heading: {
    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
    marginBottom: '1rem',
  },
  lead: {
    color: '#cbd5f5',
    maxWidth: '60ch',
    margin: '0 auto 2rem',
  },
  actions: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' },
  primary: { background: '#10b981', padding: '0.75rem 1.5rem', borderRadius: '0.75rem' },
  secondary: {
    border: '1px solid rgba(148,163,184,0.5)',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
  },
};

