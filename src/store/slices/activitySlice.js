import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { activityService } from '../../services/activityService'

// Async thunks
export const fetchActivities = createAsyncThunk(
  'activities/fetchActivities',
  async (params, { rejectWithValue }) => {
    try {
      const response = await activityService.getAllActivities(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const fetchActivityById = createAsyncThunk(
  'activities/fetchActivityById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await activityService.getActivityById(id)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const activitySlice = createSlice({
  name: 'activities',
  initialState: {
    items: [],
    currentActivity: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentActivity: (state) => {
      state.currentActivity = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchActivities
      .addCase(fetchActivities.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Handle fetchActivityById
      .addCase(fetchActivityById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchActivityById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentActivity = action.payload
      })
      .addCase(fetchActivityById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearCurrentActivity } = activitySlice.actions
export default activitySlice.reducer 