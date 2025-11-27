import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useItems from '../hooks/useItems';
import ItemForm from '../components/ItemForm';
import ItemTable from '../components/ItemTable';

export default function Dashboard() {
  const { role } = useAuth();
  const { items, loading, error, search, setSearch, createItem, updateItem, deleteItem } = useItems();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredItems = useMemo(() => {
    if (filter === 'latest') {
      return [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (filter === 'alphabetical') {
      return [...items].sort((a, b) => a.title.localeCompare(b.title));
    }
    return items;
  }, [items, filter]);

  const handleSave = async (payload) => {
    if (selected) {
      await updateItem(selected.id, payload);
      setSelected(null);
    } else {
      await createItem(payload);
    }
  };

  const handleEdit = (item) => setSelected(item);
  const handleDelete = async (id) => {
    await deleteItem(id);
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>डैशबोर्ड</h2>
      <div style={styles.grid}>
        <div style={styles.panel}>
          <h3>क्विक एक्शंस</h3>
          <input
            placeholder="सर्च..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={styles.input}>
            <option value="all">सभी</option>
            <option value="latest">लेटेस्ट</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
          <ItemForm
            onSubmit={handleSave}
            isEditing={Boolean(selected)}
            selectedItem={selected}
            onCancel={() => setSelected(null)}
          />
        </div>
        <div style={styles.panel}>
          <h3>आइटम सूची</h3>
          {loading && <p>लोड हो रहा है...</p>}
          {error && <p style={styles.error}>{error}</p>}
          <ItemTable
            items={filteredItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
            readonly={role !== 'ROLE_ADMIN'}
          />
        </div>
      </div>
      {role === 'ROLE_ADMIN' ? (
        <div style={styles.adminAlert}>आपके पास एडमिन अधिकार हैं। आप आइटम डिलीट कर सकते हैं।</div>
      ) : (
        <div style={styles.userAlert}>यूज़र रोल में डिलीट निष्क्रिय है।</div>
      )}
    </section>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1rem',
  },
  panel: {
    background: 'rgba(15,23,42,0.7)',
    borderRadius: '1rem',
    padding: '1.2rem',
    border: '1px solid rgba(148,163,184,0.2)',
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '0.6rem',
    border: '1px solid rgba(148,163,184,0.4)',
    background: 'rgba(15,23,42,0.4)',
    color: '#f8fafc',
  },
  error: { color: '#f97316' },
  adminAlert: {
    padding: '1rem',
    borderRadius: '0.8rem',
    background: 'rgba(16,185,129,0.15)',
    border: '1px solid rgba(16,185,129,0.4)',
  },
  userAlert: {
    padding: '1rem',
    borderRadius: '0.8rem',
    background: 'rgba(59,130,246,0.15)',
    border: '1px solid rgba(59,130,246,0.4)',
  },
};

