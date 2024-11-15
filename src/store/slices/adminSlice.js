import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { adminService } from '../../services/adminService'

export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchDashboardStats',
  async (timeRange, { rejectWithValue }) => {
    try {
      const response = await adminService.getDashboardStats()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const fetchAllActivities = createAsyncThunk(
  'admin/fetchAllActivities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getAllActivities()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const fetchAllCategories = createAsyncThunk(
  'admin/fetchAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getAllCategories()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getAllUsers()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const fetchAllTransactions = createAsyncThunk(
  'admin/fetchAllTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getAllTransactions()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const fetchAllBanners = createAsyncThunk(
  'admin/fetchAllBanners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getAllBanners()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const fetchAllPromos = createAsyncThunk(
  'admin/fetchAllPromos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getAllPromos()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateUserRole(userId, role)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const updateUserStatus = createAsyncThunk(
  'admin/updateUserStatus',
  async ({ userId, isActive }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateUserStatus(userId, isActive)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const createActivity = createAsyncThunk(
  'admin/createActivity',
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminService.createActivity(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const updateActivity = createAsyncThunk(
  'admin/updateActivity',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateActivity(id, data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const deleteActivity = createAsyncThunk(
  'admin/deleteActivity',
  async (id, { rejectWithValue }) => {
    try {
      await adminService.deleteActivity(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const createCategory = createAsyncThunk(
  'admin/createCategory',
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminService.createCategory(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const updateCategory = createAsyncThunk(
  'admin/updateCategory',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateCategory(id, data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'admin/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      await adminService.deleteCategory(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const createBanner = createAsyncThunk(
  'admin/createBanner',
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminService.createBanner(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const updateBanner = createAsyncThunk(
  'admin/updateBanner',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateBanner(id, data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const deleteBanner = createAsyncThunk(
  'admin/deleteBanner',
  async (id, { rejectWithValue }) => {
    try {
      await adminService.deleteBanner(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
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
        state.stats = action.payload.data
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
      // All Banners
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
      // All Promos
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
      // Create Banner
      .addCase(createBanner.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.isLoading = false
        state.banners.push(action.payload)
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update Banner
      .addCase(updateBanner.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.banners.findIndex(banner => banner.id === action.payload.id)
        if (index !== -1) {
          state.banners[index] = action.payload
        }
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Delete Banner
      .addCase(deleteBanner.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.isLoading = false
        state.banners = state.banners.filter(banner => banner.id !== action.payload)
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearAdminData } = adminSlice.actions
export default adminSlice.reducer 