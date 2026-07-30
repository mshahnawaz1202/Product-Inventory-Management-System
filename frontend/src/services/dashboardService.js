import api from './api';

export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },
  getRecentMovements: async () => {
    const response = await api.get('/dashboard/recent-movements');
    return response.data;
  },
  getMovementChart: async () => {
    const response = await api.get('/dashboard/movement-chart');
    return response.data;
  },
  getLowStock: async () => {
    const response = await api.get('/dashboard/low-stock');
    return response.data;
  },
  getInventoryByCategory: async () => {
    const response = await api.get('/dashboard/inventory-by-category');
    return response.data;
  },
};
/**--------------------------------------------------------------- */
