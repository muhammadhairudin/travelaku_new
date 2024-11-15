import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../components/common/Container'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { CreditCardIcon, DocumentArrowUpIcon } from '@heroicons/react/24/outline'
import { uploadService } from '../../../services/uploadService'
import { updateTransactionProof } from '../../../store/slices/transactionSlice'

export default function Payment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentTransaction, isLoading, error } = useSelector((state) => state.transaction)
  
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [uploadError, setUploadError] = useState(null)

  useEffect(() => {
    if (!id) {
      navigate('/transactions')
    }
  }, [id, navigate])

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setUploadError(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError('Pilih file terlebih dahulu')
      return
    }

    try {
      setUploadLoading(true)
      setUploadError(null)

      // Upload image first
      const uploadResponse = await uploadService.uploadImage(selectedFile)
      const imageUrl = uploadResponse.data.imageUrl

      // Update transaction with proof of payment
      await dispatch(updateTransactionProof({
        transactionId: id,
        data: { proofPaymentUrl: imageUrl }
      })).unwrap()

      // Redirect to transactions page
      navigate('/transactions')
    } catch (err) {
      setUploadError(err.message || 'Gagal mengupload bukti pembayaran')
    } finally {
      setUploadLoading(false)
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <Container className="py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <CreditCardIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            Pembayaran
          </h1>
        </div>

        {/* Payment Instructions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-serif font-bold text-primary mb-4">
            Instruksi Pembayaran
          </h2>
          <div className="prose max-w-none">
            <ol className="list-decimal list-inside space-y-2">
              <li>Transfer ke rekening berikut:
                <div className="ml-6 mt-2">
                  <p className="font-medium">Bank BCA</p>
                  <p>1234567890</p>
                  <p>a.n. PT TravelAku Indonesia</p>
                </div>
              </li>
              <li>Jumlah yang harus ditransfer:
                <div className="ml-6 mt-2">
                  <p className="text-2xl font-bold text-primary">
                    Rp {currentTransaction?.totalPrice.toLocaleString('id-ID')}
                  </p>
                </div>
              </li>
              <li>Upload bukti pembayaran di bawah ini</li>
            </ol>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-serif font-bold text-primary mb-4">
            Upload Bukti Pembayaran
          </h2>

          <div className="space-y-4">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="proof-upload"
              />
              <label
                htmlFor="proof-upload"
                className="flex flex-col items-center cursor-pointer"
              >
                <DocumentArrowUpIcon className="h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Klik untuk memilih file atau drag & drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG (max. 2MB)
                </p>
              </label>
            </div>

            {/* Preview */}
            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-48 rounded-lg"
                />
              </div>
            )}

            {uploadError && (
              <div className="text-sm text-red-500">
                {uploadError}
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploadLoading}
              className={`w-full btn btn-primary ${uploadLoading ? 'loading' : ''}`}
            >
              {uploadLoading ? 'Mengupload...' : 'Upload Bukti Pembayaran'}
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
} 