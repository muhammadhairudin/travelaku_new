import PropTypes from 'prop-types'
import { CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline'

export default function StatusBadge({ status }) {
  const getStatusInfo = (status) => {
    if (status === 'pending') {
      return {
        label: 'Menunggu Pembayaran',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        icon: <ClockIcon className="w-5 h-5" />
      }
    }

    const statusMap = {
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

    return statusMap[status] || statusMap.pending
  }

  const statusInfo = getStatusInfo(status)

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color} ${statusInfo.bgColor}`}>
      {statusInfo.icon}
      {statusInfo.label}
    </span>
  )
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired
} 