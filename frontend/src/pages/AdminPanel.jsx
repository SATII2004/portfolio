import { useMemo } from 'react';
import useItems from '../hooks/useItems';
import ItemTable from '../components/ItemTable';

export default function AdminPanel() {
  const { items, loading, error, deleteItem } = useItems();

  const stats = useMemo(() => {
    const total = items.length;
    const latest = items.slice(0, 5);
    return { total, latest };
  }, [items]);

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>Admin Control Center</h2>
      <div style={styles.cardGrid}>
        <article style={styles.metric}>
          <p>Total Items</p>
          <h3>{stats.total}</h3>
        </article>
        <article style={styles.metric}>
          <p>CI/CD Status</p>
          <h3>Green ✅</h3>
        </article>
      </div>
      <div style={styles.panel}>
        <h3>Latest Activities</h3>
        {loading && <p>Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}
        <ItemTable items={stats.latest} onDelete={deleteItem} onEdit={() => {}} readonly={false} />
      </div>
    </section>
  );
}

const styles = {
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  metric: {
    padding: '1rem',
    borderRadius: '1rem',
    border: '1px solid rgba(148,163,184,0.2)',
    background: 'rgba(30,41,59,0.8)',
  },
  panel: {
    padding: '1rem',
    borderRadius: '1rem',
    border: '1px solid rgba(148,163,184,0.2)',
    background: 'rgba(30,41,59,0.8)',
  },
  error: { color: '#f97316' },
};

