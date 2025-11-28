import dayjs from 'dayjs';

export default function ItemTable({ items, onEdit, onDelete, readonly }) {
  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Created At</th>
            {!readonly && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description || '-'}</td>
              <td>{dayjs(item.createdAt).format('DD MMM YYYY HH:mm')}</td>
              {!readonly && (
                <td style={styles.actions}>
                  <button type="button" onClick={() => onEdit(item)} style={styles.edit}>
                    Edit
                  </button>
                  <button type="button" onClick={() => onDelete(item.id)} style={styles.delete}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  wrapper: {
    overflowX: 'auto',
    borderRadius: '0.8rem',
    border: '1px solid rgba(148,163,184,0.2)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  edit: {
    background: '#3b82f6',
    color: '#fff',
    flex: 1,
  },
  delete: {
    background: '#ef4444',
    color: '#fff',
    flex: 1,
  },
};

