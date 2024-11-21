import PropTypes from 'prop-types'
import { BellAlertIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

export default function TransactionAlert({ transactions }) {
  const navigate = useNavigate()
  
  // Hitung transaksi yang perlu perhatian
  const pendingConfirmations = transactions.filter(t => 
    t.status === 'pending' && t.proofPaymentUrl
  ).length

  const recentTransactions = transactions
    .filter(t => {
      const transactionDate = new Date(t.createdAt)
      const oneDayAgo = new Date()
      oneDayAgo.setDate(oneDayAgo.getDate() - 1)
      return transactionDate >= oneDayAgo
    }).length

  if (!pendingConfirmations && !recentTransactions) return null

  // Fungsi untuk handle navigasi dengan query params
  const handleNavigate = (filterParams) => {
    const queryString = new URLSearchParams(filterParams).toString()
    navigate(`/admin/transactions?${queryString}`)
  }

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2">
      {/* Pending Confirmations - Hanya filter status */}
      {pendingConfirmations > 0 && (
        <div className="flex items-center gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <BellAlertIcon className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-yellow-800">
              Menunggu Konfirmasi Pembayaran
            </h3>
            <p className="text-sm text-yellow-600">
              {pendingConfirmations} transaksi memerlukan konfirmasi
            </p>
          </div>
          <button
            onClick={() => handleNavigate({ 
              status: 'waiting_confirmation'  // Hanya kirim status
            })}
            className="px-4 py-2 text-sm font-medium text-yellow-700 hover:text-yellow-800"
          >
            Lihat
          </button>
        </div>
      )}

      {/* Recent Transactions - Tetap dengan filter tanggal */}
      {recentTransactions > 0 && (
        <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <BellAlertIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-blue-800">
              Transaksi Baru
            </h3>
            <p className="text-sm text-blue-600">
              {recentTransactions} transaksi dalam 24 jam terakhir
            </p>
          </div>
          <button
            onClick={() => handleNavigate({ 
              startDate: new Date(Date.now() - 24*60*60*1000).toISOString().split('T')[0],
              endDate: new Date().toISOString().split('T')[0],
              sortBy: 'newest'
            })}
            className="px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            Lihat
          </button>
        </div>
      )}
    </div>
  )
}

TransactionAlert.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      proofPaymentUrl: PropTypes.string,
      createdAt: PropTypes.string.isRequired
    })
  ).isRequired
} 