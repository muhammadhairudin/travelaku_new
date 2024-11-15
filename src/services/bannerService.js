import axiosInstance from '../lib/axios'

export const bannerService = {
  getBanners: async () => {
    const response = await axiosInstance.get('/api/v1/banners')
    return response.data
  }
} 