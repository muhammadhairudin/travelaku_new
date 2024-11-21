import PropTypes from 'prop-types'
import { CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline'

export default function TransactionTimeline({ transaction }) {
  const getStatusInfo = (status) => {
    const statusMap = {
      pending: {
        label: 'Menunggu Pembayaran',
        icon: <ClockIcon className="w-5 h-5 text-yellow-500" />,
        color: 'text-yellow-500'
      },
      waiting_confirmation: {
        label: 'Menunggu Konfirmasi Admin',
        icon: <ClockIcon className="w-5 h-5 text-blue-500" />,
        color: 'text-blue-500'
      },
      success: {
        label: 'Pembayaran Dikonfirmasi',
        icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
        color: 'text-green-500'
      },
      rejected: {
        label: 'Pembayaran Ditolak',
        icon: <XCircleIcon className="w-5 h-5 text-red-500" />,
        color: 'text-red-500'
      }
    }

    return statusMap[status] || statusMap.pending
  }

  const timelineEvents = [
    {
      status: 'pending',
      date: transaction.createdAt,
      label: 'Transaksi Dibuat'
    },
    ...(transaction.proofPaymentUrl ? [{
      status: 'waiting_confirmation',
      date: transaction.updatedAt,
      label: 'Bukti Pembayaran Diupload'
    }] : []),
    ...(transaction.status === 'success' ? [{
      status: 'success',
      date: transaction.updatedAt,
      label: 'Pembayaran Dikonfirmasi'
    }] : []),
    ...(transaction.status === 'rejected' ? [{
      status: 'rejected',
      date: transaction.updatedAt,
      label: `Pembayaran Ditolak${transaction.rejectionReason ? ': ' + transaction.rejectionReason : ''}`
    }] : [])
  ]

  return (
    <div className="space-y-4">
      {timelineEvents.map((event, index) => {
        const statusInfo = getStatusInfo(event.status)
        return (
          <div key={index} className="flex gap-3">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              event.status === transaction.status ? 'bg-gray-100' : 'bg-gray-50'
            }`}>
              {statusInfo.icon}
            </div>
            <div>
              <p className={`font-medium ${statusInfo.color}`}>
                {event.label}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(event.date).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

TransactionTimeline.propTypes = {
  transaction: PropTypes.shape({
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    proofPaymentUrl: PropTypes.string,
    rejectionReason: PropTypes.string
  }).isRequired
} 