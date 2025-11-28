import { useEffect, useState } from 'react';

const initialState = { title: '', description: '' };

export default function ItemForm({ onSubmit, isEditing, selectedItem, onCancel }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (selectedItem) {
      setForm({ title: selectedItem.title, description: selectedItem.description || '' });
    } else {
      setForm(initialState);
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.wrapper}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        rows={3}
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <div style={styles.buttons}>
        <button type="submit" style={styles.primary}>
          {isEditing ? 'Update' : 'Add'}
        </button>
        {isEditing && (
          <button type="button" onClick={onCancel} style={styles.secondary}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    background: 'rgba(15,23,42,0.6)',
    padding: '1rem',
    borderRadius: '0.8rem',
    border: '1px solid rgba(148,163,184,0.2)',
  },
  buttons: { display: 'flex', gap: '0.5rem' },
  primary: { background: '#10b981', color: '#fff', flex: 1 },
  secondary: { background: '#475569', color: '#fff', flex: 1 },
};

