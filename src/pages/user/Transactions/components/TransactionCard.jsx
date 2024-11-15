import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/solid'

const statusConfig = {
  pending: {
    label: 'Menunggu Pembayaran',
    icon: ClockIcon,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  success: {
    label: 'Pembayaran Berhasil',
    icon: CheckCircleIcon,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  failed: {
    label: 'Pembayaran Gagal',
    icon: XCircleIcon,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
}

export default function TransactionCard({ transaction }) {
  const status = statusConfig[transaction.status]
  const StatusIcon = status.icon

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">
            ID Transaksi: {transaction.id}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(transaction.createdAt).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full ${status.bgColor} ${status.color} flex items-center gap-1`}>
          <StatusIcon className="h-4 w-4" />
          <span className="text-sm font-medium">{status.label}</span>
        </div>
      </div>

      {/* Items */}
      <div className="p-4 space-y-4">
        {transaction.items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <img
              src={item.activity.imageUrls[0]}
              alt={item.activity.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-grow">
              <h3 className="font-medium">{item.activity.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {item.activity.description}
              </p>
              <p className="text-primary font-medium mt-1">
                Rp {item.activity.price.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Total Pembayaran</p>
          <p className="text-lg font-bold text-primary">
            Rp {transaction.totalPrice.toLocaleString('id-ID')}
          </p>
        </div>
        {transaction.status === 'pending' && (
          <Link 
            to={`/payment/${transaction.id}`}
            className="btn btn-primary"
          >
            Bayar Sekarang
          </Link>
        )}
      </div>
    </div>
  )
}

TransactionCard.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['pending', 'success', 'failed']).isRequired,
    totalPrice: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        activity: PropTypes.shape({
          title: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
} 