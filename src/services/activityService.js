import axiosInstance from '../lib/axios'

export const activityService = {
  // Get all activities with optional filters
  getAllActivities: async (params = {}) => {
    const response = await axiosInstance.get('/api/v1/activities', { params })
    return response.data
  },

  // Get activity by ID
  getActivityById: async (id) => {
    const response = await axiosInstance.get(`/api/v1/activity/${id}`)
    return response.data
  },

  // Create activity (admin only)
  createActivity: async (data) => {
    const response = await axiosInstance.post('/api/v1/create-activity', data)
    return response.data
  },

  // Update activity (admin only)
  updateActivity: async (id, data) => {
    const response = await axiosInstance.post(`/api/v1/update-activity/${id}`, data)
    return response.data
  },

  // Delete activity (admin only)
  deleteActivity: async (id) => {
    const response = await axiosInstance.delete(`/api/v1/delete-activity/${id}`)
    return response.data
  }
} 