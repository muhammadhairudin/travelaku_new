import api from '../lib/axios'

export const paymentService = {
  getPaymentMethods: async () => {
    const response = await api.get('/api/v1/payment-methods')
    return response.data
  },

  generatePaymentMethod: async () => {
    const response = await api.post('/api/v1/generate-payment-methods')
    return response.data
  }
} 