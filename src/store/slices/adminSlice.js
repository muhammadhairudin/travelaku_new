import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/axios'

export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchDashboardStats',
  async (timeRange, { rejectWithValue }) => {
    try {
      const [activities, users, transactions] = await Promise.all([
        api.get('/api/v1/activities'),
        api.get('/api/v1/all-user'),
        api.get('/api/v1/my-transactions')
      ])

      const stats = {
        totalActivities: activities.data.data?.length || 0,
        totalUsers: users.data.data?.length || 0,
        totalTransactions: transactions.data.data?.length || 0,
      }

      return stats
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat statistik')
    }
  }
)

export const fetchAllActivities = createAsyncThunk(
  'admin/fetchAllActivities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/v1/activities')
      return response.data.data || []
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat aktivitas')
    }
  }
)

export const fetchAllCategories = createAsyncThunk(
  'admin/fetchAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/v1/categories')
      return response.data.data || []
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat kategori')
    }
  }
)

export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/v1/all-user')
      return response.data.data || []
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat pengguna')
    }
  }
)

export const fetchAllTransactions = createAsyncThunk(
  'admin/fetchAllTransactions',
  async (_, { rejectWithValue }) => {
    try {
      // Ambil semua transaksi
      const response = await api.get('/api/v1/all-transactions')
      
      // Ambil detail setiap transaksi
      const detailedTransactions = await Promise.all(
        response.data.data.map(async (transaction) => {
          const detail = await api.get(`/api/v1/transaction/${transaction.id}`)
          return {
            ...detail.data.data,
            user: transaction.user,
            amount: detail.data.data.amount || calculateAmount(detail.data.data.items),
            items: detail.data.data.items || []
          }
        })
      )

      return detailedTransactions
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Helper function untuk menghitung total
const calculateAmount = (items = []) => {
  const subtotal = items.reduce((acc, item) => {
    return acc + ((item.activity?.price || 0) * (item.quantity || 1))
  }, 0)
  return subtotal + (subtotal * 0.05) // Tambah service fee 5%
}

export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/v1/update-profile`, { role })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui peran pengguna')
    }
  }
)

export const updateUserStatus = createAsyncThunk(
  'admin/updateUserStatus',
  async ({ userId, isActive }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/v1/users/${userId}/status`, { isActive })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui status pengguna')
    }
  }
)

export const createActivity = createAsyncThunk(
  'admin/createActivity',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/v1/activities', data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal membuat aktivitas')
    }
  }
)

export const updateActivity = createAsyncThunk(
  'admin/updateActivity',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/v1/activities/${id}`, data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui aktivitas')
    }
  }
)

export const deleteActivity = createAsyncThunk(
  'admin/deleteActivity',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/v1/activities/${id}`)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menghapus aktivitas')
    }
  }
)

export const createCategory = createAsyncThunk(
  'admin/createCategory',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/v1/categories', data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal membuat kategori')
    }
  }
)

export const updateCategory = createAsyncThunk(
  'admin/updateCategory',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/v1/categories/${id}`, data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui kategori')
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'admin/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/v1/categories/${id}`)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menghapus kategori')
    }
  }
)

export const fetchAllBanners = createAsyncThunk(
  'admin/fetchAllBanners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/v1/banners')
      return response.data.data || []
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat banner')
    }
  }
)

export const createBanner = createAsyncThunk(
  'admin/createBanner',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/v1/create-banner', data)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal membuat banner')
    }
  }
)

export const updateBanner = createAsyncThunk(
  'admin/updateBanner',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/v1/update-banner/${id}`, data)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui banner')
    }
  }
)

export const deleteBanner = createAsyncThunk(
  'admin/deleteBanner',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/v1/delete-banner/${id}`)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menghapus banner')
    }
  }
)

export const fetchAllPromos = createAsyncThunk(
  'admin/fetchAllPromos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/v1/promos')
      return response.data.data || []
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat promo')
    }
  }
)

export const createPromo = createAsyncThunk(
  'admin/createPromo',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/v1/create-promo', data)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal membuat promo')
    }
  }
)

export const updatePromo = createAsyncThunk(
  'admin/updatePromo',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/v1/update-promo/${id}`, data)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui promo')
    }
  }
)

export const deletePromo = createAsyncThunk(
  'admin/deletePromo',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/v1/delete-promo/${id}`)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menghapus promo')
    }
  }
)

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: null,
    activities: [],
    categories: [],
    users: [],
    transactions: [],
    banners: [],
    promos: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAdminData: (state) => {
      state.stats = null
      state.activities = []
      state.categories = []
      state.users = []
      state.transactions = []
      state.banners = []
      state.promos = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false
        state.stats = action.payload
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // All Activities
      .addCase(fetchAllActivities.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAllActivities.fulfilled, (state, action) => {
        state.isLoading = false
        state.activities = action.payload
      })
      .addCase(fetchAllActivities.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // All Categories
      .addCase(fetchAllCategories.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = action.payload
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // All Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // All Transactions
      .addCase(fetchAllTransactions.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false
        state.transactions = action.payload
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update User Role
      .addCase(updateUserRole.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.users.findIndex(user => user.id === action.payload.id)
        if (index !== -1) {
          state.users[index] = action.payload
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update User Status
      .addCase(updateUserStatus.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.users.findIndex(user => user.id === action.payload.id)
        if (index !== -1) {
          state.users[index] = action.payload
        }
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Create Activity
      .addCase(createActivity.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.isLoading = false
        state.activities.push(action.payload)
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update Activity
      .addCase(updateActivity.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.activities.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
          state.activities[index] = action.payload
        }
      })
      .addCase(updateActivity.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Delete Activity
      .addCase(deleteActivity.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.isLoading = false
        state.activities = state.activities.filter(item => item.id !== action.payload)
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Create Category
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories.push(action.payload)
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.categories.findIndex(cat => cat.id === action.payload.id)
        if (index !== -1) {
          state.categories[index] = action.payload
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = state.categories.filter(cat => cat.id !== action.payload)
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Banner Cases
      .addCase(fetchAllBanners.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAllBanners.fulfilled, (state, action) => {
        state.isLoading = false
        state.banners = action.payload
      })
      .addCase(fetchAllBanners.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Promo Cases
      .addCase(fetchAllPromos.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAllPromos.fulfilled, (state, action) => {
        state.isLoading = false
        state.promos = action.payload
      })
      .addCase(fetchAllPromos.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearAdminData } = adminSlice.actions
export default adminSlice.reducer 