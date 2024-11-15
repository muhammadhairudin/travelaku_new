import axiosInstance from '../lib/axios'

// Dummy data untuk reviews
const dummyReviews = [
  {
    id: '1',
    activityId: '466df1da-2a08-4e0e-97aa-b5df5960afbe',
    user: {
      name: 'Budi Santoso',
      profilePictureUrl: 'https://i.pravatar.cc/150?img=1'
    },
    rating: 5,
    comment: 'Pengalaman yang luar biasa! Pemandangan indah dan pelayanan sangat baik. Guide-nya ramah dan profesional.',
    createdAt: '2024-03-14T10:00:00Z'
  },
  {
    id: '2',
    activityId: '466df1da-2a08-4e0e-97aa-b5df5960afbe',
    user: {
      name: 'Siti Rahayu',
      profilePictureUrl: 'https://i.pravatar.cc/150?img=2'
    },
    rating: 4,
    comment: 'Aktivitas yang menyenangkan untuk keluarga. Anak-anak sangat senang. Recommended banget!',
    createdAt: '2024-03-13T15:30:00Z'
  },
  {
    id: '3',
    activityId: '466df1da-2a08-4e0e-97aa-b5df5960afbe',
    user: {
      name: 'Ahmad Wijaya',
      profilePictureUrl: 'https://i.pravatar.cc/150?img=3'
    },
    rating: 5,
    comment: 'Tempatnya bagus, bersih, dan terawat. Cocok untuk liburan keluarga. Pasti akan kembali lagi!',
    createdAt: '2024-03-12T09:15:00Z'
  },
  {
    id: '4',
    activityId: '466df1da-2a08-4e0e-97aa-b5df5960afbe',
    user: {
      name: 'Dewi Lestari',
      profilePictureUrl: 'https://i.pravatar.cc/150?img=4'
    },
    rating: 5,
    comment: 'Harga sangat worth it dengan pengalaman yang didapat. Fasilitas lengkap dan nyaman.',
    createdAt: '2024-03-11T14:20:00Z'
  },
  {
    id: '5',
    activityId: '466df1da-2a08-4e0e-97aa-b5df5960afbe',
    user: {
      name: 'Rudi Hermawan',
      profilePictureUrl: 'https://i.pravatar.cc/150?img=5'
    },
    rating: 4,
    comment: 'Lokasi strategis dan mudah dijangkau. Pelayanannya memuaskan. Akan merekomendasikan ke teman-teman.',
    createdAt: '2024-03-10T11:45:00Z'
  }
]

export const reviewService = {
  // Get reviews for an activity
  getActivityReviews: async (activityId) => {
    // Simulasi network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Filter reviews berdasarkan activityId
    const filteredReviews = dummyReviews.filter(review => review.activityId === activityId)
    
    return {
      data: filteredReviews
    }
  },

  // Create review
  createReview: async (data) => {
    // Simulasi network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newReview = {
      id: Math.random().toString(36).substr(2, 9),
      activityId: data.activityId,
      user: {
        name: 'Anda',
        profilePictureUrl: 'https://i.pravatar.cc/150?img=8'
      },
      rating: data.rating,
      comment: data.comment,
      createdAt: new Date().toISOString()
    }

    dummyReviews.unshift(newReview)
    
    return {
      data: newReview
    }
  },

  // Update review (dummy)
  updateReview: async (reviewId, data) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: { ...data, id: reviewId } }
  },

  // Delete review (dummy)
  deleteReview: async (reviewId) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: { id: reviewId } }
  }
} 