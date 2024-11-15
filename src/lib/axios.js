import axios from 'axios'

const baseURL = 'https://travel-journal-api-bootcamp.do.dibimbing.id'
const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c'

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'apiKey': apiKey,
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('Using token:', token)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle response
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.data)
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data)
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance 