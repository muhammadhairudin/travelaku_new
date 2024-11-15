import axiosInstance from '../lib/axios'

export const transactionService = {
  // Get user's transactions
  getTransactions: async () => {
    const response = await axiosInstance.get('/api/v1/transactions')
    return response.data
  },

  // Create transaction
  createTransaction: async (data) => {
    const response = await axiosInstance.post('/api/v1/create-transaction', data)
    return response.data
  },

  // Update transaction proof of payment
  updateTransactionProof: async (transactionId, data) => {
    const response = await axiosInstance.post(
      `/api/v1/update-transaction-proof-payment/${transactionId}`,
      data
    )
    return response.data
  },

  // Get transaction by ID
  getTransactionById: async (id) => {
    const response = await axiosInstance.get(`/api/v1/transaction/${id}`)
    return response.data
  }
} 