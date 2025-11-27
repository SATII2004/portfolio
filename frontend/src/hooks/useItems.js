import { useCallback, useEffect, useState } from 'react';
import api from '../services/apiClient';

export default function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const params = search ? { params: { q: search } } : undefined;
      const { data } = await api.get('/items', params);
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'डेटा लोड करने में त्रुटि');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    load();
  }, [load]);

  const createItem = async (payload) => {
    await api.post('/items', payload);
    await load();
  };

  const updateItem = async (id, payload) => {
    await api.put(`/items/${id}`, payload);
    await load();
  };

  const deleteItem = async (id) => {
    await api.delete(`/items/${id}`);
    await load();
  };

  return { items, loading, error, search, setSearch, createItem, updateItem, deleteItem };
}

