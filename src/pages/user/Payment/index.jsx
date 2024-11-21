import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Container from '../../../components/common/Container'
import { updateTransactionProof } from '../../../store/slices/transactionSlice'
import api from '../../../lib/axios'
import { uploadService } from '../../../services/uploadService'
import LoadingSpinner from '../../../components/common/LoadingSpinner'

export default function Payment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [transaction, setTransaction] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Ambil detail transaksi
        const response = await api.get('/api/v1/my-transactions')
        console.log('All transactions:', response.data)

        // Cari transaksi yang sesuai dengan ID
        const currentTransaction = response.data.data.find(t => t.id === id)
        
        if (!currentTransaction) {
          throw new Error('Transaksi tidak ditemukan')
        }

        // Ambil detail payment method jika ada paymentMethodId
        if (currentTransaction.paymentMethodId) {
          const paymentResponse = await api.get('/api/v1/payment-methods')
          const paymentMethod = paymentResponse.data.data.find(
            p => p.id === currentTransaction.paymentMethodId
          )
          currentTransaction.payment_method = paymentMethod
        }

        console.log('Current transaction:', currentTransaction)
        setTransaction(currentTransaction)

      } catch (err) {
        console.error('Failed to fetch transaction:', err)
        setError(err.message || 'Gagal memuat data transaksi')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactionDetail()
  }, [id])

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setIsUploading(true)
      setUploadError(null)

      // Upload file
      const uploadResponse = await uploadService.uploadImage(file)
      console.log('Upload response:', uploadResponse)

      if (!uploadResponse.imageUrl) {
        throw new Error('Failed to get image URL')
      }

      // Update bukti pembayaran
      await dispatch(updateTransactionProof({
        transactionId: id,
        proofPaymentUrl: uploadResponse.imageUrl
      })).unwrap()

      // Update state transaksi
      setTransaction(prev => ({
        ...prev,
        proofPaymentUrl: uploadResponse.imageUrl
      }))

      alert('Bukti pembayaran berhasil diupload')
      
      // Redirect ke halaman transaksi
      setTimeout(() => {
        navigate('/transactions')
      }, 1500)

    } catch (err) {
      console.error('Upload failed:', err)
      setUploadError(err.message || 'Gagal mengupload bukti pembayaran')
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading) {
    return (
      <Container className="py-8">
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-8">
        <div className="text-center text-red-500">
          {error}
          <button
            onClick={() => navigate('/transactions')}
            className="block mx-auto mt-4 text-primary hover:underline"
          >
            Kembali ke Transaksi
          </button>
        </div>
      </Container>
    )
  }

  if (!transaction) {
    return (
      <Container className="py-8">
        <div className="text-center">
          Transaksi tidak ditemukan
          <button
            onClick={() => navigate('/transactions')}
            className="block mx-auto mt-4 text-primary hover:underline"
          >
            Kembali ke Transaksi
          </button>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Pembayaran</h1>
          <button
            onClick={() => navigate('/transactions')}
            className="text-primary hover:underline"
          >
            Lihat Semua Transaksi
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Transaction Info */}
          <div>
            <h2 className="text-lg font-bold mb-4">Detail Transaksi</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">ID Transaksi</span>
                <span>{transaction?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Invoice</span>
                <span>{transaction?.invoiceId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Pembayaran</span>
                <span className="font-bold text-primary">
                  Rp {transaction?.totalAmount?.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`${
                  transaction?.status === 'success' ? 'text-green-600' : 
                  transaction?.status === 'pending' ? 'text-yellow-600' : 
                  'text-red-600'
                }`}>
                  {transaction?.status === 'success' ? 'Pembayaran Berhasil' : 
                   transaction?.status === 'pending' ? 'Menunggu Pembayaran' : 
                   'Pembayaran Gagal'}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Info */}
          {transaction?.payment_method && (
            <div>
              <h2 className="text-lg font-bold mb-4">Instruksi Pembayaran</h2>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  {transaction.payment_method.imageUrl && (
                    <img 
                      src={transaction.payment_method.imageUrl}
                      alt={transaction.payment_method.name}
                      className="h-8 w-auto"
                    />
                  )}
                  <div>
                    <p className="font-medium">{transaction.payment_method.name}</p>
                    <p className="text-sm text-gray-600">
                      Virtual Account: {transaction.payment_method.virtual_account_number}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>1. Transfer sesuai nominal yang tertera</p>
                  <p>2. Gunakan Virtual Account yang telah diberikan</p>
                  <p>3. Upload bukti transfer pada form di bawah</p>
                </div>
              </div>
            </div>
          )}

          {/* Upload Payment Proof */}
          {transaction?.status === 'pending' && (
            <div>
              <h2 className="text-lg font-bold mb-4">Upload Bukti Pembayaran</h2>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="w-full"
                />
                {isUploading && (
                  <div className="text-blue-600">
                    <LoadingSpinner /> Mengupload bukti pembayaran...
                  </div>
                )}
                {uploadError && (
                  <div className="text-red-500">
                    {uploadError}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Proof Preview */}
          {transaction?.proofPaymentUrl && (
            <div>
              <h2 className="text-lg font-bold mb-4">Bukti Pembayaran</h2>
              <img 
                src={transaction.proofPaymentUrl} 
                alt="Bukti Pembayaran"
                className="max-w-full rounded-lg"
              />
              <p className="mt-2 text-sm text-gray-500">
                Diunggah pada {new Date(transaction.updatedAt).toLocaleString('id-ID')}
              </p>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
} 