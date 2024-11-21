import api from '../lib/axios'

export const cartService = {
  getCart: async () => {
    const response = await api.get('/api/v1/carts')
    return response.data
  },

  addToCart: async ({ activityId, quantity }) => {
    const response = await api.post('/api/v1/add-cart', {
      activityId,
      quantity
    })
    return response.data
  },

  removeFromCart: async (cartId) => {
    const response = await api.delete(`/api/v1/delete-cart/${cartId}`)
    return response.data
  },

  updateCartQuantity: async (cartId, quantity) => {
    const response = await api.post(`/api/v1/update-cart/${cartId}`, {
      cartId,
      quantity: parseInt(quantity)
    })
    return response.data
  }
} 