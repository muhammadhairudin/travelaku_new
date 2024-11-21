import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../../components/common/Container'
import api from '../../../lib/axios'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import TransactionFilters from './components/TransactionFilters'
import TransactionTable from './components/TransactionTable'
import Pagination from '../../../components/common/Pagination'

export default function AdminTransactions() {
  const navigate = useNavigate()
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    status: 'all',
    startDate: '',
    endDate: '',
    search: ''
  })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [pageSize] = useState(10)

  useEffect(() => {
    fetchTransactions()
  }, [filters, currentPage, pageSize])

  const fetchTransactions = async () => {
    try {
      setIsLoading(true)
      
      // 1. Ambil semua user terlebih dahulu
      const [transactionResponse, usersResponse] = await Promise.all([
        api.get('/api/v1/all-transactions', {
          params: {
            status: filters.status !== 'all' ? filters.status : undefined,
            page: currentPage,
            limit: pageSize,
            search: filters.search || undefined,
            startDate: filters.startDate || undefined,
            endDate: filters.endDate || undefined
          }
        }),
        api.get('/api/v1/all-user')
      ])

      // 2. Buat map untuk mempercepat pencarian user
      const userMap = {}
      usersResponse.data.data.forEach(user => {
        userMap[user.id] = user
      })

      // 3. Gabungkan data transaksi dengan user
      const transactionsWithUser = transactionResponse.data.data.map(transaction => ({
        ...transaction,
        user: userMap[transaction.userId] || { 
          name: 'User tidak ditemukan', 
          email: '-' 
        }
      }))

      setTransactions(transactionsWithUser)
      setTotalPages(Math.ceil(transactionResponse.data.total / pageSize))
    } catch (err) {
      console.error('Failed to fetch transactions:', err)
      setError('Gagal memuat data transaksi')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async (transactionId, status) => {
    try {
      await api.post(`/api/v1/update-transaction-status/${transactionId}`, {
        status
      })
      await fetchTransactions() // Refresh data
      alert('Status transaksi berhasil diupdate')
    } catch (error) {
      console.error('Failed to update status:', error)
      alert('Gagal mengupdate status transaksi')
    }
  }

  const handleViewDetail = (transactionId) => {
    navigate(`/admin/transactions/${transactionId}`)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <Container className="min-h-[80vh] relative">
        <div className="flex absolute inset-0 justify-center items-center">
          <LoadingSpinner />
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="min-h-[80vh] relative">
        <div className="flex absolute inset-0 justify-center items-center">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="mb-2 text-2xl font-bold">Manajemen Transaksi</h1>
          <p className="text-gray-600">
            Kelola dan verifikasi transaksi dari pengguna
          </p>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Transaksi</p>
          <p className="text-2xl font-bold">{transactions.length}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600">Menunggu Konfirmasi</p>
          <p className="text-2xl font-bold text-blue-600">
            {transactions.filter(t => 
              (t.status === 'pending' && t.proofPaymentUrl) || 
              t.status === 'waiting_confirmation'
            ).length}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600">Sukses</p>
          <p className="text-2xl font-bold text-green-600">
            {transactions.filter(t => t.status === 'success').length}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Pendapatan</p>
          <p className="text-2xl font-bold text-primary">
            Rp {transactions
              .filter(t => t.status === 'success')
              .reduce((acc, t) => acc + (t.totalAmount || 0), 0)
              .toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* Transaction Table dengan filter terintegrasi */}
      <TransactionTable 
        transactions={transactions}
        onUpdateStatus={handleUpdateStatus}
        onViewDetail={handleViewDetail}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </Container>
  )
} 