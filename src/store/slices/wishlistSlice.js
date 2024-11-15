import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { wishlistService } from '../../services/wishlistService'

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistService.getWishlist()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (activityId, { rejectWithValue }) => {
    try {
      const response = await wishlistService.addToWishlist(activityId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (wishlistId, { rejectWithValue }) => {
    try {
      await wishlistService.removeFromWishlist(wishlistId)
      return wishlistId
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearWishlist: (state) => {
      state.items = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Add to Wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false
        state.items.push(action.payload)
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Remove from Wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = state.items.filter(item => item.id !== action.payload)
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer 