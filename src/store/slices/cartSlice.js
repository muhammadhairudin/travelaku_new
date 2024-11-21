import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { cartService } from '../../services/cartService'

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getCart()
      console.log('Cart Response:', response)
      
      // Pastikan data valid
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid cart data')
      }
      
      return response.data
    } catch (error) {
      console.error('Fetch cart error:', error)
      return rejectWithValue(error.message || 'Gagal memuat keranjang')
    }
  }
)

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ activityId, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const response = await cartService.addToCart({ activityId, quantity })
      console.log('Add to cart response:', response)
      
      // Refresh cart setelah menambah item
      await dispatch(fetchCart())
      
      return response.data
    } catch (error) {
      console.error('Add to cart error:', error)
      return rejectWithValue(error.response?.data?.message || 'Gagal menambahkan ke keranjang')
    }
  }
)

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (cartId, { rejectWithValue }) => {
    try {
      await cartService.removeFromCart(cartId)
      return cartId
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const updateCartQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ cartId, quantity }, { rejectWithValue, dispatch }) => {
    try {
      console.log('Updating cart quantity:', { cartId, quantity })
      
      const response = await cartService.updateCartQuantity(cartId, quantity)
      console.log('Update quantity response:', response)

      if (response.status === 'error') {
        throw new Error(response.message || 'Gagal mengupdate quantity')
      }

      // Refresh cart setelah update berhasil
      await dispatch(fetchCart())
      
      return response.data
    } catch (error) {
      console.error('Update quantity error:', error)
      return rejectWithValue(error.message || 'Gagal mengupdate quantity')
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload || []
        console.log('Cart items updated:', state.items)
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        console.error('Fetch cart rejected:', action.payload)
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        console.error('Add to cart rejected:', action.payload)
      })
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = state.items.filter(item => item.id !== action.payload)
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update Cart Quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateCartQuantity.fulfilled, (state) => {
        state.isLoading = false
        // Tidak perlu update items di sini karena sudah di-refresh oleh fetchCart
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        console.error('Update quantity rejected:', action.payload)
      })
  },
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer 