import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services/authService'

// Async thunks
export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authService.register(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authService.login(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout()
      return null
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getProfile()
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authService.updateProfile(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearAuth: (state) => {
      state.user = null
      state.token = null
      state.lastFetched = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('Login action payload:', action.payload)
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.lastFetched = Date.now()
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token)
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.message || 'Login failed'
        state.token = null
        state.user = null
        state.lastFetched = null
        localStorage.removeItem('token')
      })
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        console.log('Get profile action payload:', action.payload)
        state.isLoading = false
        state.user = action.payload.user
        state.lastFetched = Date.now()
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.user = null
        state.token = null
        state.lastFetched = null
        localStorage.removeItem('token')
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.data
        state.lastFetched = Date.now()
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearError, setError, clearAuth } = authSlice.actions
export default authSlice.reducer 