import PropTypes from 'prop-types'
import { useState } from 'react'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { updateTransactionProof } from '../../../../store/slices/transactionSlice'
import api from '../../../../lib/axios'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  waiting_confirmation: 'bg-blue-100 text-blue-800',
  success: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800'
}

const statusLabels = {
  pending: 'Menunggu Pembayaran',
  waiting_confirmation: 'Menunggu Konfirmasi Admin',
  success: 'Pembayaran Dikonfirmasi',
  rejected: 'Pembayaran Ditolak',
  cancelled: 'Transaksi Dibatalkan'
}

const getTransactionStatus = (transaction) => {
  if (transaction.status === 'pending') {
    return transaction.proofPaymentUrl 
      ? { 
          status: 'waiting_confirmation',
          color: 'bg-blue-100 text-blue-800',
          label: 'Menunggu Konfirmasi Admin'
        }
      : {
          status: 'pending',
          color: 'bg-yellow-100 text-yellow-800',
          label: 'Menunggu Pembayaran'
        }
  }
  
  // Status lainnya tetap sama
  const statusMap = {
    success: {
      color: 'bg-green-100 text-green-800',
      label: 'Pembayaran Dikonfirmasi'
    },
    rejected: {
      color: 'bg-red-100 text-red-800',
      label: 'Pembayaran Ditolak'
    },
    cancelled: {
      color: 'bg-gray-100 text-gray-800',
      label: 'Transaksi Dibatalkan'
    }
  }

  return {
    status: transaction.status,
    ...statusMap[transaction.status]
  }
}

export default function TransactionCard({ transaction }) {
  const dispatch = useDispatch()
  const [isUploading, setIsUploading] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleProofUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setIsUploading(true)

      // 1. Upload image terlebih dahulu
      const formData = new FormData()
      formData.append('image', file)

      const uploadResponse = await api.post('/api/v1/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (!uploadResponse.data?.url) {
        throw new Error('Gagal mengupload gambar')
      }

      // 2. Update bukti pembayaran dengan URL gambar
      await dispatch(updateTransactionProof({
        transactionId: transaction.id,
        proofPaymentUrl: uploadResponse.data.url
      })).unwrap()

      alert('Bukti pembayaran berhasil diupload')
    } catch (error) {
      console.error('Upload failed:', error)
      alert(error.message || 'Gagal mengupload bukti pembayaran')
    } finally {
      setIsUploading(false)
    }
  }

  // Dapatkan status yang sesuai
  const status = getTransactionStatus(transaction)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">ID Transaksi</p>
            <p className="font-medium">{transaction.id}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Total Pembayaran</p>
            <p className="text-lg font-bold">
              Rp {transaction.totalAmount?.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Metode Pembayaran</p>
            <div className="flex items-center gap-2">
              {transaction.payment_method?.imageUrl && (
                <img 
                  src={transaction.payment_method.imageUrl} 
                  alt={transaction.payment_method.name}
                  className="h-6 w-auto"
                />
              )}
              <span>{transaction.payment_method?.name}</span>
            </div>
          </div>
        </div>

        {/* Virtual Account Info */}
        {transaction.payment_method?.virtual_account_number && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Nomor Virtual Account:</p>
            <p className="font-mono font-medium">
              {transaction.payment_method.virtual_account_number}
            </p>
          </div>
        )}

        {/* Upload Bukti & Detail Toggle */}
        <div className="flex justify-between items-center">
          {transaction.status === 'pending' && !transaction.proofPaymentUrl && (
            <label className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              <CloudArrowUpIcon className="w-5 h-5" />
              <span>{isUploading ? 'Mengupload...' : 'Upload Bukti'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleProofUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          )}
          {transaction.status === 'waiting_confirmation' && (
            <span className="text-blue-600">
              Menunggu konfirmasi admin
            </span>
          )}
          {transaction.status === 'success' && (
            <span className="text-green-600">
              Pembayaran telah dikonfirmasi
            </span>
          )}
          {transaction.status === 'rejected' && (
            <span className="text-red-600">
              Pembayaran ditolak: {transaction.rejectionReason || 'Bukti pembayaran tidak valid'}
            </span>
          )}
          {transaction.status === 'cancelled' && (
            <span className="text-gray-600">
              Transaksi telah dibatalkan
            </span>
          )}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-primary hover:text-primary/80"
          >
            {showDetails ? 'Sembunyikan Detail' : 'Lihat Detail'}
          </button>
        </div>

        {/* Details */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Tanggal Transaksi</p>
                <p>{new Date(transaction.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Invoice ID</p>
                <p>{transaction.invoiceId}</p>
              </div>
              {transaction.proofPaymentUrl && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Bukti Pembayaran</p>
                  <img 
                    src={transaction.proofPaymentUrl} 
                    alt="Bukti Pembayaran"
                    className="w-full max-w-xs rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

TransactionCard.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    totalAmount: PropTypes.number,
    payment_method: PropTypes.object,
    createdAt: PropTypes.string,
    invoiceId: PropTypes.string,
    proofPaymentUrl: PropTypes.string,
    rejectionReason: PropTypes.string
  }).isRequired
} 