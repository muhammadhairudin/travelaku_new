import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/axios'

// Fetch transactions
export const fetchTransactions = createAsyncThunk(
  'transaction/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/v1/my-transactions')
      return response.data.data || []
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Create transaction
export const createTransaction = createAsyncThunk(
  'transaction/create',
  async (data, { rejectWithValue }) => {
    try {
      console.log('Creating transaction with data:', data)
      const response = await api.post('/api/v1/create-transaction', data)
      console.log('Transaction response:', response.data)
      return response.data
    } catch (error) {
      console.error('Transaction error:', error.response?.data || error)
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

// Update transaction proof
export const updateTransactionProof = createAsyncThunk(
  'transaction/updateProof',
  async ({ transactionId, proofPaymentUrl }, { rejectWithValue }) => {
    try {
      if (typeof proofPaymentUrl !== 'string') {
        throw new Error('URL bukti pembayaran tidak valid')
      }

      const response = await api.post(
        `/api/v1/update-transaction-proof-payment/${transactionId}`,
        { proofPaymentUrl }
      )

      const updatedTransactions = await api.get('/api/v1/my-transactions')
      return updatedTransactions.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

// Update transaction status (Admin only)
export const updateTransactionStatus = createAsyncThunk(
  'transaction/updateStatus',
  async ({ transactionId, status }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/v1/update-transaction-status/${transactionId}`,
        { status }
      )
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Delete transaction - Ganti endpoint sesuai API
export const deleteTransaction = createAsyncThunk(
  'transaction/delete',
  async (transactionId, { rejectWithValue }) => {
    try {
      // Ganti dengan endpoint yang benar
      await api.delete(`/api/v1/delete-transaction/${transactionId}`)
      return transactionId
    } catch (error) {
      console.error('Delete transaction error:', error)
      return rejectWithValue(
        error.response?.data?.message || 'Gagal menghapus transaksi'
      )
    }
  }
)

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactions: [],
    currentTransaction: null,
    isLoading: false,
    error: null
  },
  reducers: {
    clearTransaction: (state) => {
      state.currentTransaction = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Transactions
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
      // Create Transaction
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
      // Update Transaction Proof
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
      // Delete Transaction
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false
        state.transactions = state.transactions.filter(
          t => t.id !== action.payload
        )
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { clearTransaction } = transactionSlice.actions
export default transactionSlice.reducer 