import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { bannerService } from '../../services/bannerService'

export const fetchBanners = createAsyncThunk(
  'banners/fetchBanners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bannerService.getBanners()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const bannerSlice = createSlice({
  name: 'banners',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearBanners: (state) => {
      state.items = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.items = []
      })
  },
})

export const { clearBanners } = bannerSlice.actions
export default bannerSlice.reducer 