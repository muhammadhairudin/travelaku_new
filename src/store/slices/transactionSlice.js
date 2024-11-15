import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { transactionService } from '../../services/transactionService'

export const createTransaction = createAsyncThunk(
  'transaction/createTransaction',
  async (data, { rejectWithValue }) => {
    try {
      const response = await transactionService.createTransaction(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const updateTransactionProof = createAsyncThunk(
  'transaction/updateTransactionProof',
  async ({ transactionId, data }, { rejectWithValue }) => {
    try {
      const response = await transactionService.updateTransactionProof(transactionId, data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const fetchTransactions = createAsyncThunk(
  'transaction/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionService.getTransactions()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    currentTransaction: null,
    transactions: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentTransaction: (state) => {
      state.currentTransaction = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentTransaction = action.payload
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(updateTransactionProof.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateTransactionProof.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentTransaction = action.payload
      })
      .addCase(updateTransactionProof.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false
        state.transactions = action.payload
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearCurrentTransaction } = transactionSlice.actions
export default transactionSlice.reducer 