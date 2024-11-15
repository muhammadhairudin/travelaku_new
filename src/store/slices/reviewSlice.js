import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { reviewService } from '../../services/reviewService'

export const fetchActivityReviews = createAsyncThunk(
  'reviews/fetchActivityReviews',
  async (activityId, { rejectWithValue }) => {
    try {
      const response = await reviewService.getActivityReviews(activityId)
      return response.data || []
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (data, { rejectWithValue }) => {
    try {
      const response = await reviewService.createReview(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearReviews: (state) => {
      state.items = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityReviews.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchActivityReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchActivityReviews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.items = []
      })
      .addCase(createReview.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false
        state.items.unshift(action.payload)
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearReviews } = reviewSlice.actions
export default reviewSlice.reducer 