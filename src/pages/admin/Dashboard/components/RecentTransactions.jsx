import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline'

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
  }
}

export default function RecentTransactions({ transactions }) {
  const navigate = useNavigate()

  const getTransactionStatus = (transaction) => {
    if (transaction.status === 'pending' && transaction.proofPaymentUrl) {
      return statusMap.waiting_confirmation
    }
    return statusMap[transaction.status] || statusMap.pending
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Transaksi Terbaru</h2>
          <button
            onClick={() => navigate('/admin/transactions')}
            className="text-primary hover:text-primary/80"
          >
            Lihat Semua
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left">ID TRANSAKSI</th>
                <th className="px-4 py-3 text-left">TOTAL</th>
                <th className="px-4 py-3 text-left">STATUS</th>
                <th className="px-4 py-3 text-left">TANGGAL</th>
                <th className="px-4 py-3 text-left">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transactions.map((transaction) => {
                const status = getTransactionStatus(transaction)
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
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${status.color} ${status.bgColor}`}>
                        {status.icon}
                        {status.label}
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
                      <button
                        onClick={() => navigate(`/admin/transactions/${transaction.id}`)}
                        className="text-primary hover:text-primary/80"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {transactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Tidak ada transaksi
          </div>
        )}
      </div>
    </div>
  )
}

RecentTransactions.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      totalAmount: PropTypes.number,
      status: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      proofPaymentUrl: PropTypes.string
    })
  ).isRequired
} 