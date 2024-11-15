import axiosInstance from '../lib/axios'

export const adminService = {
  // Get all users
  getAllUsers: async () => {
    const response = await axiosInstance.get('/api/v1/all-user')
    return response.data
  },

  // Update user role
  updateUserRole: async (userId, role) => {
    const response = await axiosInstance.put(`/api/v1/update-user-role/${userId}`, {
      role: role // role bisa 'admin' atau 'user'
    })
    return response.data
  },

  // Update user status
  updateUserStatus: async (userId, isActive) => {
    const response = await axiosInstance.put(`/api/v1/update-user-status/${userId}`, {
      isActive: isActive
    })
    return response.data
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    const response = await axiosInstance.get('/api/v1/admin/dashboard')
    return {
      data: {
        ...response.data,
        locationDistribution: [
          {
            id: '1',
            city: 'Jakarta',
            province: 'DKI Jakarta',
            latitude: -6.2088,
            longitude: 106.8456,
            totalActivities: 150,
            totalRevenue: 25000000
          },
          {
            id: '2', 
            city: 'Bandung',
            province: 'Jawa Barat',
            latitude: -6.9175,
            longitude: 107.6191,
            totalActivities: 89,
            totalRevenue: 15000000
          },
          {
            id: '3',
            city: 'Surabaya',
            province: 'Jawa Timur', 
            latitude: -7.2575,
            longitude: 112.7521,
            totalActivities: 76,
            totalRevenue: 12000000
          },
          // ... data kota lainnya
        ]
      }
    }
  },

  // Activities CRUD
  getAllActivities: async () => {
    const response = await axiosInstance.get('/api/v1/activities')
    return response.data
  },

  getActivityById: async (id) => {
    const response = await axiosInstance.get(`/api/v1/activity/${id}`)
    return response.data
  },

  createActivity: async (data) => {
    const response = await axiosInstance.post('/api/v1/create-activity', {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      categoryId: data.categoryId,
      imageUrls: data.imageUrls,
      facilities: data.facilities,
      address: data.address,
      province: data.province, 
      city: data.city,
      locationMap: data.locationMap,
      isActive: data.isActive
    })
    return response.data
  },

  updateActivity: async (id, data) => {
    const response = await axiosInstance.put(`/api/v1/update-activity/${id}`, {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      categoryId: data.categoryId,
      imageUrls: data.imageUrls,
      facilities: data.facilities,
      address: data.address,
      province: data.province,
      city: data.city,
      locationMap: data.locationMap,
      isActive: data.isActive
    })
    return response.data
  },

  deleteActivity: async (id) => {
    const response = await axiosInstance.delete(`/api/v1/delete-activity/${id}`)
    return response.data
  },

  // Categories CRUD
  getAllCategories: async () => {
    const response = await axiosInstance.get('/api/v1/categories')
    return response.data
  },

  createCategory: async (data) => {
    const response = await axiosInstance.post('/api/v1/create-category', {
      name: data.name,
      imageUrl: data.imageUrl,
      isActive: data.isActive
    })
    return response.data
  },

  updateCategory: async (id, data) => {
    const response = await axiosInstance.put(`/api/v1/update-category/${id}`, {
      name: data.name,
      imageUrl: data.imageUrl,
      isActive: data.isActive
    })
    return response.data
  },

  deleteCategory: async (id) => {
    const response = await axiosInstance.delete(`/api/v1/delete-category/${id}`)
    return response.data
  },

  // Transactions
  getAllTransactions: async () => {
    const response = await axiosInstance.get('/api/v1/admin/transactions')
    return response.data
  },

  // Update transaction status
  updateTransactionStatus: async (id, status) => {
    const response = await axiosInstance.put(`/api/v1/admin/update-transaction-status/${id}`, { 
      status 
    })
    return response.data
  },

  // Promo CRUD
  getAllPromos: async () => {
    const response = await axiosInstance.get('/api/v1/promos')
    return response.data
  },

  createPromo: async (data) => {
    const response = await axiosInstance.post('/api/v1/create-promo', {
      title: data.title,
      description: data.description, 
      imageUrl: data.imageUrl,
      promoCode: data.promoCode,
      promoDiscountPrice: Number(data.promoDiscountPrice),
      minimumClaimPrice: Number(data.minimumClaimPrice),
      termsCondition: data.termsCondition,
      isActive: data.isActive
    })
    return response.data
  },

  updatePromo: async (id, data) => {
    const response = await axiosInstance.put(`/api/v1/update-promo/${id}`, {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl, 
      promoCode: data.promoCode,
      promoDiscountPrice: Number(data.promoDiscountPrice),
      minimumClaimPrice: Number(data.minimumClaimPrice),
      termsCondition: data.termsCondition,
      isActive: data.isActive
    })
    return response.data
  },

  deletePromo: async (id) => {
    const response = await axiosInstance.delete(`/api/v1/delete-promo/${id}`)
    return response.data
  },

  // Banner CRUD
  getAllBanners: async () => {
    const response = await axiosInstance.get('/api/v1/banners')
    return response.data
  },

  createBanner: async (data) => {
    const response = await axiosInstance.post('/api/v1/create-banner', {
      name: data.name,
      imageUrl: data.imageUrl,
      isActive: data.isActive
    })
    return response.data
  },

  updateBanner: async (id, data) => {
    const response = await axiosInstance.put(`/api/v1/update-banner/${id}`, {
      name: data.name,
      imageUrl: data.imageUrl,
      isActive: data.isActive
    })
    return response.data
  },

  deleteBanner: async (id) => {
    const response = await axiosInstance.delete(`/api/v1/delete-banner/${id}`)
    return response.data
  }
} 