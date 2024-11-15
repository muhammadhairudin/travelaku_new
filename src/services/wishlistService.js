// Dummy data untuk wishlist
let dummyWishlist = []

export const wishlistService = {
  // Get wishlist items
  getWishlist: async () => {
    // Simulasi network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      data: dummyWishlist
    }
  },

  // Add to wishlist
  addToWishlist: async (activity) => {
    // Simulasi network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      activityId: activity.id,
      activity: activity,
      createdAt: new Date().toISOString()
    }

    dummyWishlist.push(newItem)
    
    return {
      data: newItem
    }
  },

  // Remove from wishlist
  removeFromWishlist: async (wishlistId) => {
    // Simulasi network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    dummyWishlist = dummyWishlist.filter(item => item.id !== wishlistId)
    
    return {
      data: { id: wishlistId }
    }
  }
} 