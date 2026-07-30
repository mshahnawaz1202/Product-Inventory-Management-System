import api from './api';

export const stockMovementService = {
  getAll: async (params) => {
    const response = await api.get('/stock-movements', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/stock-movements/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/stock-movements', data);
    return response.data;
  },
};
/**--------------------------------------------------------------- */
