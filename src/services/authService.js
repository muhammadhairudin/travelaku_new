import axiosInstance from '../lib/axios'

export const authService = {
  // Register new user
  register: async (data) => {
    const response = await axiosInstance.post('/api/v1/register', data)
    return response.data
  },

  // Login user
  login: async (data) => {
    try {
      const response = await axiosInstance.post('/api/v1/login', data)
      console.log('Raw login response:', response.data)

      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      }

      return {
        user: response.data.data,
        token: response.data.token
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error)
      throw error.response?.data || error
    }
  },

  // Logout user
  logout: async () => {
    const response = await axiosInstance.get('/api/v1/logout')
    // Hapus token dari axios instance
    delete axiosInstance.defaults.headers.common['Authorization']
    localStorage.removeItem('token')
    return response.data
  },

  // Get logged in user
  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/api/v1/user')
      console.log('Raw profile response:', response.data)
      return {
        user: response.data.data
      }
    } catch (error) {
      console.error('Get profile error:', error.response?.data || error)
      throw error.response?.data || error
    }
  },

  // Update user profile
  updateProfile: async (data) => {
    const response = await axiosInstance.post('/api/v1/update-profile', data)
    return response.data
  }
} 