import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { CheckCircleIcon, ClockIcon, XCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSearchParams } from 'react-router-dom'

const statusMap = {
  pending: {
    label: 'Menunggu Pembayaran',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    icon: <ClockIcon className="w-5 h-5" />
  },
  waiting_confirmation: {
    label: 'Menunggu Konfirmasi',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    icon: <ClockIcon className="w-5 h-5" />
  },
  success: {
    label: 'Pembayaran Dikonfirmasi',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    icon: <CheckCircleIcon className="w-5 h-5" />
  },
  rejected: {
    label: 'Pembayaran Ditolak',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    icon: <XCircleIcon className="w-5 h-5" />
  },
  cancelled: {
    label: 'Transaksi Dibatalkan',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    icon: <XCircleIcon className="w-5 h-5" />
  }
}

const ITEMS_PER_PAGE = 10

export default function TransactionTable({ transactions, onUpdateStatus, onViewDetail }) {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // State dengan nilai default dari URL params
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'all')
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'newest')
  const [dateRange, setDateRange] = useState({
    start: searchParams.get('startDate') || '',
    end: searchParams.get('endDate') || ''
  })
  const [currentPage, setCurrentPage] = useState(1)

  // Effect untuk menangani filter dari dashboard
  useEffect(() => {
    const status = searchParams.get('status')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    
    if (status || startDate || endDate) {
      // Update state sesuai params
      if (status) setSelectedStatus(status)
      if (startDate) setDateRange(prev => ({ ...prev, start: startDate }))
      if (endDate) setDateRange(prev => ({ ...prev, end: endDate }))
      
      // Reset search dan sort ke default
      setSearchTerm('')
      setSortBy('newest')
    }
  }, [searchParams])

  // Fungsi filter yang dimodifikasi
  const filteredTransactions = transactions.filter(transaction => {
    let matchesFilter = true

    // Filter search (jika ada)
    if (searchTerm) {
      matchesFilter = matchesFilter && 
        transaction.id?.toLowerCase().includes(searchTerm.toLowerCase())
    }

    // Filter status
    if (selectedStatus !== 'all') {
      if (selectedStatus === 'waiting_confirmation') {
        matchesFilter = matchesFilter && 
          transaction.status === 'pending' && transaction.proofPaymentUrl
      } else if (selectedStatus === 'pending') {
        matchesFilter = matchesFilter && 
          transaction.status === 'pending' && !transaction.proofPaymentUrl
      } else {
        matchesFilter = matchesFilter && 
          transaction.status === selectedStatus
      }
    }

    // Filter tanggal
    if (dateRange.start || dateRange.end) {
      const transactionDate = new Date(transaction.createdAt)
      
      if (dateRange.start) {
        const startDate = new Date(dateRange.start)
        startDate.setHours(0, 0, 0, 0)
        matchesFilter = matchesFilter && transactionDate >= startDate
      }

      if (dateRange.end) {
        const endDate = new Date(dateRange.end)
        endDate.setHours(23, 59, 59, 999)
        matchesFilter = matchesFilter && transactionDate <= endDate
      }
    }

    return matchesFilter
  })

  // Sort hasil filter
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB
  })

  // Handler reset filter
  const handleResetFilters = () => {
    setSelectedStatus('all')
    setSearchTerm('')
    setDateRange({ start: '', end: '' })
    setSortBy('newest')
    setSearchParams({})
  }

  // Pagination
  const totalPages = Math.ceil(sortedTransactions.length / ITEMS_PER_PAGE)
  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Reset halaman saat filter berubah
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedStatus, searchTerm, dateRange, sortBy])

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedStatus !== 'all') params.set('status', selectedStatus)
    if (searchTerm) params.set('search', searchTerm)
    if (sortBy !== 'newest') params.set('sortBy', sortBy)
    if (dateRange.start) params.set('startDate', dateRange.start)
    if (dateRange.end) params.set('endDate', dateRange.end)
    
    setSearchParams(params)
  }, [selectedStatus, searchTerm, sortBy, dateRange, setSearchParams])

  const getTransactionStatus = (transaction) => {
    const defaultStatus = {
      label: 'Status Tidak Diketahui',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      icon: <ClockIcon className="w-5 h-5" />
    }

    if (!transaction || !transaction.status) {
      return defaultStatus
    }

    if (transaction.status === 'pending') {
      return transaction.proofPaymentUrl 
        ? {
            label: 'Menunggu Konfirmasi',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            icon: <ClockIcon className="w-5 h-5" />
          }
        : {
            label: 'Menunggu Pembayaran',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            icon: <ClockIcon className="w-5 h-5" />
          }
    }

    const statusInfo = {
      success: {
        label: 'Pembayaran Dikonfirmasi',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        icon: <CheckCircleIcon className="w-5 h-5" />
      },
      rejected: {
        label: 'Pembayaran Ditolak',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        icon: <XCircleIcon className="w-5 h-5" />
      },
      cancelled: {
        label: 'Transaksi Dibatalkan',
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        icon: <XCircleIcon className="w-5 h-5" />
      },
      failed: {
        label: 'Pembayaran Gagal',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        icon: <XCircleIcon className="w-5 h-5" />
      }
    }

    return statusInfo[transaction.status] || defaultStatus
  }

  // Handle perubahan status
  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus)
    // Reset tanggal jika status berubah
    if (newStatus !== selectedStatus) {
      setDateRange({ start: '', end: '' })
    }
  }

  // Handle perubahan tanggal
  const handleDateChange = (type, value) => {
    setDateRange(prev => {
      const newRange = { ...prev, [type]: value }
      // Reset status jika tanggal berubah
      if (value !== prev[type]) {
        setSelectedStatus('all')
      }
      return newRange
    })
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="w-full md:w-96 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari ID Transaksi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-3 py-2 border rounded-lg min-w-[180px]"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu Pembayaran</option>
              <option value="waiting_confirmation">Menunggu Konfirmasi</option>
              <option value="success">Pembayaran Dikonfirmasi</option>
              <option value="rejected">Pembayaran Ditolak</option>
              <option value="cancelled">Dibatalkan</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => handleDateChange('start', e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => handleDateChange('end', e.target.value)}
            min={dateRange.start}
            className="px-3 py-2 border rounded-lg"
          />

          {(selectedStatus !== 'all' || searchTerm || dateRange.start || dateRange.end || sortBy !== 'newest') && (
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-primary hover:text-primary/80"
            >
              Reset Filter
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left">ID TRANSAKSI</th>
                <th className="px-4 py-3 text-left">TOTAL</th>
                <th className="px-4 py-3 text-left">METODE PEMBAYARAN</th>
                <th className="px-4 py-3 text-left">STATUS</th>
                <th className="px-4 py-3 text-left">TANGGAL</th>
                <th className="px-4 py-3 text-left">BUKTI BAYAR</th>
                <th className="px-4 py-3 text-left">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedTransactions.map((transaction) => {
                const statusInfo = getTransactionStatus(transaction)
                return (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="font-medium">{transaction.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-primary">
                          Rp {transaction.totalAmount?.toLocaleString('id-ID')}
                        </p>
                        <p className="text-xs text-gray-500">
                          Biaya Layanan: Rp {(transaction.totalAmount * 0.05)?.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {transaction.payment_method?.imageUrl && (
                          <img 
                            src={transaction.payment_method.imageUrl} 
                            alt={transaction.payment_method.name}
                            className="h-6 w-auto"
                          />
                        )}
                        <div>
                          <p className="font-medium">{transaction.payment_method?.name}</p>
                          {transaction.payment_method?.virtual_account_number && (
                            <p className="text-sm text-gray-500">
                              VA: {transaction.payment_method.virtual_account_number}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color} ${statusInfo.bgColor}`}>
                        {statusInfo.icon}
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p>{new Date(transaction.createdAt).toLocaleDateString('id-ID')}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.createdAt).toLocaleTimeString('id-ID')}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {transaction.proofPaymentUrl ? (
                        <a
                          href={transaction.proofPaymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Lihat Bukti
                        </a>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onViewDetail(transaction.id)}
                          className="text-primary hover:text-primary-dark"
                        >
                          Detail
                        </button>
                        {transaction.status === 'pending' && transaction.proofPaymentUrl && (
                          <>
                            <button
                              onClick={() => onUpdateStatus(transaction.id, 'success')}
                              className="text-green-600 hover:text-green-700"
                            >
                              Terima
                            </button>
                            <button
                              onClick={() => onUpdateStatus(transaction.id, 'failed')}
                              className="text-red-600 hover:text-red-700"
                            >
                              Tolak
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {sortedTransactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {selectedStatus !== 'all'
              ? `Tidak ada transaksi dengan status ${selectedStatus}`
              : 'Tidak ada transaksi'
            }
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Menampilkan {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, sortedTransactions.length)} dari {sortedTransactions.length} transaksi
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border'
                }`}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-1 rounded ${
                        currentPage === pageNumber
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                }
                if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return <span key={pageNumber}>...</span>
                }
                return null
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {import.meta.env.DEV && (
          <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
            <p>Debug Info:</p>
            <p>Selected Status: {selectedStatus}</p>
            <p>Date Range: {dateRange.start || '...'} s/d {dateRange.end || '...'}</p>
            <p>Current Page: {currentPage}</p>
            <p>Total Pages: {totalPages}</p>
            <p>Total Transactions: {transactions.length}</p>
            <p>Filtered Transactions: {filteredTransactions.length}</p>
            <p>Displayed Transactions: {paginatedTransactions.length}</p>
          </div>
        )}
      </div>
    </div>
  )
}

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      totalAmount: PropTypes.number,
      payment_method: PropTypes.object,
      createdAt: PropTypes.string.isRequired,
      proofPaymentUrl: PropTypes.string
    })
  ).isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
  onViewDetail: PropTypes.func.isRequired
} 