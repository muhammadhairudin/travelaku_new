import axiosInstance from '../lib/axios'

export const promoService = {
  getPromos: async () => {
    const response = await axiosInstance.get('/api/v1/promos')
    return response.data
  }
} 