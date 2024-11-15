import axiosInstance from '../lib/axios'

export const cartService = {
  // Get cart items
  getCart: async () => {
    const response = await axiosInstance.get('/api/v1/carts')
    return response.data
  },

  // Add item to cart
  addToCart: async ({ activityId, quantity }) => {
    // Cek role user dari token
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.role === 'admin') {
      throw new Error('Admin tidak diizinkan melakukan pemesanan')
    }

    const response = await axiosInstance.post('/api/v1/add-cart', {
      activityId,
      quantity
    })
    return response.data
  },

  // Remove item from cart
  removeFromCart: async (cartId) => {
    const response = await axiosInstance.delete(`/api/v1/cart/${cartId}`)
    return response.data
  },

  // Update cart item quantity
  updateCartQuantity: async (cartId, quantity) => {
    const response = await axiosInstance.put(`/api/v1/cart/${cartId}`, {
      quantity
    })
    return response.data
  }
} 