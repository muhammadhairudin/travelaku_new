import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from '../../../components/common/Container'
import api from '../../../lib/axios'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import StatusBadge from '../../../components/transaction/StatusBadge'
import ActionButtons from '../../../components/transaction/ActionButtons'
import InfoItem from '../../../components/transaction/InfoItem'
import PaymentMethodInfo from '../../../components/transaction/PaymentMethodInfo'
import PaymentSummary from '../../../components/transaction/PaymentSummary'
import ProofOfPayment from '../../../components/transaction/ProofOfPayment'
import ActivityItem from '../../../components/transaction/ActivityItem'
import TransactionTimeline from '../../../components/transaction/TransactionTimeline'
import RejectModal from '../../../components/transaction/RejectModal'

export default function TransactionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState(null)
  const [activities, setActivities] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showActions, setShowActions] = useState(false)

  useEffect(() => {
    fetchTransactionData()
  }, [id])

  const fetchTransactionData = async () => {
    try {
      setIsLoading(true)
      
      // 1. Fetch transaction detail
      const transactionResponse = await api.get(`/api/v1/transaction/${id}`)
      const transactionData = transactionResponse.data.data

      // 2. Fetch all users dan cari user yang sesuai
      let userData = null
      try {
        const usersResponse = await api.get('/api/v1/all-user')
        const users = usersResponse.data.data
        // Cari user berdasarkan userId dari transaksi
        userData = users.find(user => user.id === transactionData.userId) || {
          name: 'User tidak ditemukan',
          email: '-',
          phoneNumber: '-'
        }
      } catch (userError) {
        console.warn('Failed to fetch user data:', userError)
        userData = {
          name: 'User tidak ditemukan',
          email: '-',
          phoneNumber: '-'
        }
      }

      // 3. Fetch activities dengan error handling
      const activityData = {}
      if (transactionData.items && transactionData.items.length > 0) {
        try {
          const activityPromises = transactionData.items.map(item => 
            api.get(`/api/v1/activity/${item.activityId}`)
          )
          const activityResponses = await Promise.all(activityPromises)
          activityResponses.forEach((response, index) => {
            const activity = response.data.data
            activityData[transactionData.items[index].activityId] = activity
          })
        } catch (activityError) {
          console.warn('Failed to fetch activities:', activityError)
        }
      }

      // Combine all data
      const completeTransactionData = {
        ...transactionData,
        user: userData,
        items: transactionData.items || []
      }

      setTransaction(completeTransactionData)
      setActivities(activityData)
      setShowActions(completeTransactionData.status === 'pending' && completeTransactionData.proofPaymentUrl)
    } catch (err) {
      console.error('Failed to fetch transaction data:', err)
      setError('Gagal memuat detail transaksi')
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async () => {
    try {
      await api.post(`/api/v1/update-transaction-status/${id}`, { 
        status: 'success'
      })
      await fetchTransactionData()
      alert('Transaksi berhasil dikonfirmasi')
    } catch (error) {
      console.error('Failed to approve transaction:', error)
      alert('Gagal mengkonfirmasi transaksi')
    }
  }

  const handleReject = async () => {
    try {
      if (!rejectionReason) {
        alert('Mohon isi alasan penolakan')
        return
      }

      await api.post(`/api/v1/update-transaction-status/${id}`, { 
        status: 'rejected',
        rejectionReason
      })
      
      await fetchTransactionData()
      setShowRejectModal(false)
      setRejectionReason('')
      alert('Transaksi berhasil ditolak')
    } catch (error) {
      console.error('Failed to reject transaction:', error)
      alert('Gagal menolak transaksi')
    }
  }

  if (isLoading) {
    return (
      <Container className="min-h-[80vh] relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="min-h-[80vh] relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header & Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Detail Transaksi</h1>
            <div className="flex gap-2 text-sm text-gray-500">
              <span>ID: {transaction?.id}</span>
              <span>•</span>
              <span>{new Date(transaction?.createdAt).toLocaleString('id-ID')}</span>
            </div>
          </div>
          <button onClick={() => navigate(-1)} className="btn btn-outline">
            Kembali
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow">
          {/* Status & Actions */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">Status Transaksi</p>
                <StatusBadge status={transaction?.status} />
              </div>
              {showActions && (
                <div className="flex gap-3">
                  <ActionButtons 
                    status={transaction?.status}
                    onApprove={handleApprove}
                    onReject={() => setShowRejectModal(true)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Customer Info */}
          <div className="p-6 border-b">
            <h3 className="font-medium mb-4">Informasi Pembeli</h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Nama" value={transaction?.user?.name} />
              <InfoItem label="Email" value={transaction?.user?.email} />
              <InfoItem label="No. Telepon" value={transaction?.user?.phoneNumber} />
            </div>
          </div>

          {/* Items Detail */}
          {transaction?.items && transaction.items.length > 0 && (
            <div className="p-6 border-b">
              <h3 className="font-medium mb-4">Detail Aktivitas</h3>
              <div className="space-y-4">
                {transaction.items.map(item => (
                  <ActivityItem 
                    key={item.id}
                    item={item}
                    activity={activities[item.activityId]}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Payment Info */}
          <div className="p-6 border-b">
            <h3 className="font-medium mb-4">Informasi Pembayaran</h3>
            <div className="grid grid-cols-2 gap-6">
              <PaymentMethodInfo method={transaction?.payment_method} />
              <PaymentSummary 
                totalAmount={transaction?.totalAmount}
                serviceFee={transaction?.totalAmount * 0.05}
              />
            </div>
          </div>

          {/* Payment Proof */}
          {transaction?.proofPaymentUrl && (
            <div className="p-6 border-b">
              <h3 className="font-medium mb-4">Bukti Pembayaran</h3>
              <ProofOfPayment url={transaction.proofPaymentUrl} />
            </div>
          )}

          {/* Transaction History */}
          <div className="p-6">
            <h3 className="font-medium mb-4">Riwayat Transaksi</h3>
            <TransactionTimeline transaction={transaction} />
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      <RejectModal 
        show={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onReject={handleReject}
      />
    </Container>
  )
} 