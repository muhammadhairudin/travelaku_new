import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { promoService } from '../../services/promoService'

export const fetchPromos = createAsyncThunk(
  'promos/fetchPromos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await promoService.getPromos()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const promoSlice = createSlice({
  name: 'promos',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearPromos: (state) => {
      state.items = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromos.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPromos.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchPromos.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.items = []
      })
  },
})

export const { clearPromos } = promoSlice.actions
export default promoSlice.reducer 