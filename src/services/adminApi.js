import api from './apiClient';


const adminApi = {
  getCompanies: async () => {
    try {
      const response = await api.get('/auth/companies', { withCredentials: true });
      return response;
    } catch (error) {
      console.error('[AdminAPI] getCompanies failed:', error);
      throw error;
    }
  }
};

export default adminApi;
